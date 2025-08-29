const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Body parser
app.use(express.json());





// Prevent http param pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500, // max 500 requests per 1 minute per IP
  message: 'Too many requests from this IP, please try again after 10 minutes',
});
app.use(limiter);

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
