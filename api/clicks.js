/**
 * Serverless API endpoint: /api/clicks
 * Quản lý & đếm lượt nhấp thật cho từng tài nguyên Xuân Giáp Media
 * 
 * - Hỗ trợ GET /api/clicks?ids=id1,id2,id3 (Lấy số liệu theo lô)
 * - Hỗ trợ POST /api/clicks (Tăng số đếm bằng thao tác atomic)
 * - Tích hợp Upstash Redis (Khuyên dùng) hoặc Supabase / Local storage
 */

const fs = require("fs");
const path = require("path");

// Rate limit / Chống đếm trùng lặp trong 5 giây cho cùng 1 IP và tài nguyên
const rateLimitMap = new Map();

function isRateLimited(ip, resourceId) {
  const key = `${ip || "anon"}:${resourceId}`;
  const now = Date.now();
  const lastTime = rateLimitMap.get(key);
  if (lastTime && now - lastTime < 5000) {
    return true;
  }
  rateLimitMap.set(key, now);

  // Dọn dẹp cache định kỳ
  if (rateLimitMap.size > 5000) {
    for (const [k, t] of rateLimitMap) {
      if (now - t > 30000) rateLimitMap.delete(k);
    }
  }
  return false;
}

function isValidResourceId(id) {
  return typeof id === "string" && /^[a-zA-Z0-9_\-:.]{1,100}$/.test(id);
}

// 1. UPSTASH REDIS REST INTEGRATION
async function upstashIncr(id, redisUrl, redisToken) {
  const cleanUrl = redisUrl.replace(/\/+$/, "");
  const res = await fetch(`${cleanUrl}/incr/clicks:${encodeURIComponent(id)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`
    }
  });
  if (!res.ok) throw new Error(`Upstash HTTP ${res.status}`);
  const data = await res.json();
  return typeof data.result === "number" ? data.result : null;
}

async function upstashMGet(ids, redisUrl, redisToken) {
  if (!ids.length) return {};
  const cleanUrl = redisUrl.replace(/\/+$/, "");
  const keys = ids.map(id => `clicks:${id}`);
  const res = await fetch(`${cleanUrl}/mget`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(keys)
  });
  if (!res.ok) throw new Error(`Upstash HTTP ${res.status}`);
  const data = await res.json();
  const results = Array.isArray(data.result) ? data.result : [];
  const map = {};
  ids.forEach((id, idx) => {
    const raw = results[idx];
    const val = parseInt(raw, 10);
    map[id] = !isNaN(val) ? val : 0;
  });
  return map;
}

// 2. LOCAL FILE FALLBACK (Khi chạy local Node.js server)
const LOCAL_STORE_FILE = path.join("/tmp", "xg_resource_clicks.json");

function readLocalStore() {
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const content = fs.readFileSync(LOCAL_STORE_FILE, "utf8");
      return JSON.parse(content) || {};
    }
  } catch {}
  return {};
}

function writeLocalStore(data) {
  try {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch {}
}

module.exports = async function handler(req, res) {
  // Thiết lập CORS header
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const isRedisConfigured = Boolean(redisUrl && redisToken);

  // Xử lý GET: Lấy số liệu theo lô
  if (req.method === "GET") {
    const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const idsParam = urlObj.searchParams.get("ids") || "";
    const requestedIds = idsParam.split(",").map(s => s.trim()).filter(isValidResourceId);

    if (!requestedIds.length) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ success: true, counts: {} }));
    }

    if (isRedisConfigured) {
      try {
        const counts = await upstashMGet(requestedIds, redisUrl, redisToken);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ success: true, counts, source: "redis" }));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ success: false, error: "Database error", counts: {} }));
      }
    }

    // Fallback sang local storage nếu chưa cấu hình Redis
    const localData = readLocalStore();
    const counts = {};
    requestedIds.forEach(id => {
      counts[id] = localData[id] || 0;
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({
      success: true,
      counts,
      configured: false,
      note: "Chưa cấu hình UPSTASH_REDIS_REST_URL; đang dùng bộ lưu tạm."
    }));
  }

  // Xử lý POST: Tăng lượt nhấp atomic
  if (req.method === "POST") {
    // Đọc body
    let rawBody = "";
    if (typeof req.body === "object" && req.body !== null) {
      rawBody = JSON.stringify(req.body);
    } else {
      for await (const chunk of req) rawBody += chunk;
    }

    let parsed = {};
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ success: false, error: "Invalid JSON body" }));
    }

    const resourceId = parsed.id;
    if (!isValidResourceId(resourceId)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ success: false, error: "Invalid resource id" }));
    }

    const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "";
    if (isRateLimited(clientIp, resourceId)) {
      res.statusCode = 429;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ success: false, error: "Rate limit exceeded" }));
    }

    if (isRedisConfigured) {
      try {
        const newCount = await upstashIncr(resourceId, redisUrl, redisToken);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ success: true, id: resourceId, count: newCount }));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ success: false, error: "Database increment error" }));
      }
    }

    // Local fallback
    const localData = readLocalStore();
    localData[resourceId] = (localData[resourceId] || 0) + 1;
    writeLocalStore(localData);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({
      success: true,
      id: resourceId,
      count: localData[resourceId],
      configured: false
    }));
  }

  res.statusCode = 405;
  res.end();
};
