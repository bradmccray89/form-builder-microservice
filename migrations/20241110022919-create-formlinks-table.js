'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('form_links', {
			id: {
				type: Sequelize.UUID, // Use UUID for uniqueness and security
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
			},
			form_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'forms',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			recipient_email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			token: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			expiration_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			created_by: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
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
		await queryInterface.dropTable('form_links');
	},
};
