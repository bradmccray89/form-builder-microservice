const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Import routes
const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const formRoutes = require('./routes/formRoutes');
const formResponseRoutes = require('./routes/formResponseRoutes');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/form-responses', formResponseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);

	// Test database connection
	const { sequelize } = require('./models');
	try {
		await sequelize.authenticate();
		console.log('Database connected successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
});
