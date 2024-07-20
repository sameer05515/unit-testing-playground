import express from 'express';
import bodyParser from 'body-parser';
import employeeRoutes from './routes/employeeRoutes.js';
import cors from 'cors'; // Import cors package

const app = express();
const port = 3000;

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' })); // Set body-parser limit to 100MB
app.use(cors()); // Use cors middleware to allow all origins

// Routes
app.use('/api', employeeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
