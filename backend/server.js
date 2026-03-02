require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const reservationRoutes = require('./routes/reservations');
const contactRoutes = require('./routes/contact');

const app = express();

// Connect to database
connectDB();

// ─── Security Middleware ──────────────────────────────────

// Set secure HTTP headers
app.use(helmet());

// CORS — restrict origins in production
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Global rate limit — 100 requests per 15 minutes per IP
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
}));

// Body parser with size limit (prevent large payloads)
app.use(express.json({ limit: '10kb' }));

// Sanitize data — strip MongoDB operators like $gt, $ne from req.body/query/params
app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

// ─── Routes ───────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', restaurant: 'Mama Ko Sekuwa' });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
