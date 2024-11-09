const { Sequelize } = require('sequelize');
const config = require('./config/config.js');

// Determine the environment ('development' by default)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: dbConfig.port,
		dialect: dbConfig.dialect,
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log('Database connection has been established successfully.');
		process.exit(0); // Exit the process successfully
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
		process.exit(1); // Exit the process with an error
	});
