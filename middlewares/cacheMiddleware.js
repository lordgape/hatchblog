const cache = require('memory-cache');

// configure cache middleware
const memCache = new cache.Cache();
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.query || {};
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.json(cacheContent);
      return;
    } else {
      res.sendResponse = res.json;
      res.json = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports.cacheMiddleware = cacheMiddleware;
