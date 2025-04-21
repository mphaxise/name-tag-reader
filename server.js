// Server for Name Tag Reader Application
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Initialize Express app
const app = express();

// Set port based on environment or default to 8080 (standard for Google Cloud)
const PORT = process.env.PORT || 8080;

// Apply middleware
app.use(compression()); // Compress responses
app.use(cors()); // Enable CORS for all routes
// Configure helmet with a more permissive Content Security Policy for cloud deployment
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      fontSrc: ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
      connectSrc: ["'self'", "blob:"],
      // Add a nonce for the inline scripts if needed in the future
      // For now, we're using 'unsafe-inline' which is less secure but necessary for this application
    },
    // This is important for Render.com deployment
    reportOnly: false
  })
); // Set security headers

// Add server health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Name Tag Reader server running on port ${PORT}`);
  console.log(`Server started at http://0.0.0.0:${PORT}`);
});
