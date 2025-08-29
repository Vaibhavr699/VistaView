const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// Removed xss-clean and hpp due to incompatibility with Express v5 (they mutate req.query)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

module.exports = (app) => {
  app.use(helmet());
  app.use('/api', limiter);
  // Removed express-mongo-sanitize due to incompatibility with Express v5 (readonly req.query)
  // app.use(xss());
  // app.use(hpp());
};