const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const url = require('url');
const config = require('config');

// Redis
const redisUrl = config.get('session.redis.url');
const parsedRedisUrl = url.parse(redisUrl);

const redisOptions = {
  host: parsedRedisUrl.hostname,
  port: parsedRedisUrl.port
};

if(parsedRedisUrl.auth) {
  redisOptions.pass = parsedRedisUrl.auth.split(':')[1];
}

const store = new RedisStore(redisOptions);

// Session
const resave = false;
const saveUninitialized = false;
const secret = config.get('session.secret');
const secure = config.get('session.cookie.secure') === 'true';
const cookie = { secure };

console.log('---------------------------------------------');
console.log('              Redis Parsed URL               ');
console.log('---------------------------------------------');
console.log(`Parsed URL: ${JSON.stringify(parsedRedisUrl, null, 2)}`);

const expressOptions = {
  store,
  secret,
  cookie,
  resave,
  saveUninitialized,
};

module.exports = expressSession(expressOptions);
