require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { initModels } = require('./models');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const tagRoutes = require('./routes/tagRoutes');
const documentRoutes = require('./routes/documentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/test-db', async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query('SELECT NOW()');
        res.json({ currentTime: results[0].now });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

initModels();

app.use('/api/users', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/dashboard', dashboardRoutes);

const path = require('path');

app.use(errorHandler);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});