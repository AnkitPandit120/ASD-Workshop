const CACHE_TTL_MS = 60 * 1000;
let cache = {};

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const cached = cache[key];

  if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS) {
    res.set("X-Cache", "HIT");
    return res.json(cached.value);
  }

  res.set("X-Cache", "MISS");
  const originalJson = res.json.bind(res);
  res.json = (value) => {
    if (res.statusCode < 400) {
      cache[key] = { value, createdAt: Date.now() };
    }
    return originalJson(value);
  };

  next();
}

function invalidateCache(req, res, next) {
  const originalJson = res.json.bind(res);
  res.json = (value) => {
    if (res.statusCode < 400) {
      cache = {};
    }
    return originalJson(value);
  };

  next();
}

module.exports = { cacheMiddleware, invalidateCache };
