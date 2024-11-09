'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('form_response_answers', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			form_response_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'form_responses',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			form_field_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'form_fields',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			value: {
				type: Sequelize.TEXT, // Use TEXT to accommodate various data types
				allowNull: true,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('form_response_answers');
	},
};
