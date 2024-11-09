require('dotenv').config(); // Load environment variables from .env

module.exports = {
	development: {
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_DATABASE || 'database_development',
		host: process.env.DB_HOST || '127.0.0.1',
		port: process.env.DB_PORT || '5432',
		dialect: 'postgres',
	},
	test: {
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_DATABASE_TEST || 'database_test',
		host: process.env.DB_HOST || '127.0.0.1',
		port: process.env.DB_PORT || '5432',
		dialect: 'postgres',
	},
	production: {
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_DATABASE_PROD || 'database_production',
		host: process.env.DB_HOST || '127.0.0.1',
		port: process.env.DB_PORT || '5432',
		dialect: 'postgres',
	},
};
