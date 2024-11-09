'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('organizations', [
			{
				id: 1,
				name: 'Demo Organization',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				name: 'Test Organization',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
		await queryInterface.sequelize.query(
			`SELECT setval('"organizations_id_seq"', (SELECT MAX(id) FROM "organizations"))`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('organizations', null, {});
	},
};
