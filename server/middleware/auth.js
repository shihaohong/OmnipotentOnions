const session = require('express-session');
const RedisStore = require('connect-redis')(session);
console.log('REDIS_URL: ', process.env.REDIS_URL);
const redis = require('redis');
const redisClient = (process.env.REDIS_URL) ? redis.createClient({ host: process.env.REDIS_URL }) : redis.createClient();

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
