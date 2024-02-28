import express from 'express';
import { Buffer } from 'node:buffer';
import yourRequestHandler from './index.mjs'; // Adjust the import path if necessary

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Forward all POST requests to your handler
app.post('/v1/chat/completions', async (req, res) => {
    // Create a mock of the Fetch API's Request object
    const mockRequest = {
      method: req.method,
      url: req.protocol + '://' + req.get('host') + req.originalUrl,
      headers: {
        get: (headerName) => req.headers[headerName.toLowerCase()],
      },
      json: async () => req.body,
    };
  
    try {
      const response = await yourRequestHandler.fetch(mockRequest);
      const body = await response.text();
  
      res.status(response.status).send(body);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

// Optional: Handle OPTIONS for CORS preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
