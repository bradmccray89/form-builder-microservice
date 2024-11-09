'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('forms', [
			{
				id: 1,
				title: 'Customer Feedback Form',
				description: 'A form to collect customer feedback.',
				created_by: 2, // Editor User
				organization_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				title: 'Employee Survey',
				description: 'Survey to gather employee opinions.',
				created_by: 2, // Editor User
				organization_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
		// Reset sequence counter
		await queryInterface.sequelize.query(
			`SELECT setval('"forms_id_seq"', (SELECT MAX(id) FROM "forms"))`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('forms', null, {});
	},
};
