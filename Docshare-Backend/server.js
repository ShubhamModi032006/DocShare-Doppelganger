require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const shareRoutes = require('./routes/shareRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// ── CORS ──────────────────────────────────────────────────────────────────
// Allow the deployed Vercel frontend AND local development simultaneously.
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean); // remove undefined/null entries

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS: Origin ${origin} is not allowed`));
  },
  credentials: true,
}));
// ──────────────────────────────────────────────────────────────────────────

// Define Routes
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/share', shareRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.send('API Running'));

// 404 catch-all — tells you exactly which route is missing
app.use((req, res) => {
  console.warn(`[404] ${req.method} ${req.originalUrl} — Route not found`);
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
