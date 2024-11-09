'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const passwordHash = await bcrypt.hash('password123', 10);

		await queryInterface.bulkInsert('users', [
			{
				id: 1,
				name: 'Admin User',
				email: 'admin@example.com',
				password_hash: passwordHash,
				role: 'admin',
				organization_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				name: 'Editor User',
				email: 'editor@example.com',
				password_hash: passwordHash,
				role: 'editor',
				organization_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				name: 'Viewer User',
				email: 'viewer@example.com',
				password_hash: passwordHash,
				role: 'viewer',
				organization_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
		// Reset sequence counter
		await queryInterface.sequelize.query(
			`SELECT setval('"users_id_seq"', (SELECT MAX(id) FROM "users"))`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
	},
};
