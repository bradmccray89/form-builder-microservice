'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('form_fields', [
			// Fields for Customer Feedback Form (form_id: 1)
			{
				id: 1,
				form_id: 1,
				label: 'Name',
				field_type: 'text',
				placeholder: 'Enter your name',
				required: true,
				order: 1,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				form_id: 1,
				label: 'Email',
				field_type: 'text',
				placeholder: 'Enter your email',
				required: true,
				order: 2,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				form_id: 1,
				label: 'Feedback Type',
				field_type: 'dropdown',
				placeholder: null,
				required: true,
				order: 3,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				form_id: 1,
				label: 'Additional Comments',
				field_type: 'textarea',
				placeholder: 'Enter additional comments',
				required: false,
				order: 4,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},

			// Fields for Employee Survey Form (form_id: 2)
			{
				id: 5,
				form_id: 2,
				label: 'Employee ID',
				field_type: 'text',
				placeholder: 'Enter your employee ID',
				required: true,
				order: 1,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 6,
				form_id: 2,
				label: 'Department',
				field_type: 'multiselect',
				placeholder: null,
				required: true,
				order: 2,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 7,
				form_id: 2,
				label: 'Satisfaction Level',
				field_type: 'radio',
				placeholder: null,
				required: true,
				order: 3,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 8,
				form_id: 2,
				label: 'Suggestions for Improvement',
				field_type: 'textarea',
				placeholder: 'Enter your suggestions',
				required: false,
				order: 4,
				validation: null,
				conditional_logic: null,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);

		// Reset sequence counter
		await queryInterface.sequelize.query(
			`SELECT setval('"form_fields_id_seq"', (SELECT MAX(id) FROM "form_fields"))`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('form_fields', null, {});
	},
};
