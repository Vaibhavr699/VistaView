const express = require('express');
const db = require('./config/db');
const app = require('./app'); // Import the app from app.js

require('dotenv').config();

const PORT = process.env.PORT || 3000;

console.log('Attempting to listen on port:', PORT);
const startServer = async () => {
  try {
    await db.init(); // Initialize database schema
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});