'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('form_responses', [
			{
				id: 1,
				form_id: 1, // Customer Feedback Form
				submitted_by: 3, // Viewer User
				submitted_at: new Date(),
			},
			{
				id: 2,
				form_id: 2, // Employee Survey
				submitted_by: 2, // Editor User
				submitted_at: new Date(),
			},
		]);

		// Reset sequence counter
		await queryInterface.sequelize.query(
			`SELECT setval('"form_responses_id_seq"', (SELECT MAX(id) FROM "form_responses"))`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('form_responses', null, {});
	},
};
