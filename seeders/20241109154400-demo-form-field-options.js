'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('form_field_options', [
			// Options for Feedback Type (form_field_id: 3)
			{
				id: 1,
				form_field_id: 3,
				value: 'complaint',
				label: 'Complaint',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				form_field_id: 3,
				value: 'suggestion',
				label: 'Suggestion',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				form_field_id: 3,
				value: 'inquiry',
				label: 'Inquiry',
				created_at: new Date(),
				updated_at: new Date(),
			},

			// Options for Department (form_field_id: 6)
			{
				id: 4,
				form_field_id: 6,
				value: 'engineering',
				label: 'Engineering',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 5,
				form_field_id: 6,
				value: 'marketing',
				label: 'Marketing',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 6,
				form_field_id: 6,
				value: 'hr',
				label: 'Human Resources',
				created_at: new Date(),
				updated_at: new Date(),
			},

			// Options for Satisfaction Level (form_field_id: 7)
			{
				id: 7,
				form_field_id: 7,
				value: 'very_satisfied',
				label: 'Very Satisfied',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 8,
				form_field_id: 7,
				value: 'satisfied',
				label: 'Satisfied',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 9,
				form_field_id: 7,
				value: 'neutral',
				label: 'Neutral',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 10,
				form_field_id: 7,
				value: 'dissatisfied',
				label: 'Dissatisfied',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 11,
				form_field_id: 7,
				value: 'very_dissatisfied',
				label: 'Very Dissatisfied',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);

		await queryInterface.sequelize.query(
			`SELECT setval('"form_field_options_id_seq"', (SELECT MAX(id) FROM "form_field_options"))`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('form_field_options', null, {});
	},
};
