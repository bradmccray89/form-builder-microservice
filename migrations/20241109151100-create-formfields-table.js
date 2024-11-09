module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('form_fields', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
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
			label: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			field_type: {
				type: Sequelize.ENUM,
				values: [
					'text',
					'textarea',
					'dropdown',
					'multiselect',
					'checkbox',
					'radio',
					'date',
				],
				allowNull: false,
			},
			placeholder: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			required: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			order: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			validation: {
				type: Sequelize.JSONB,
				allowNull: true,
			},
			conditional_logic: {
				type: Sequelize.JSONB,
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
		await queryInterface.dropTable('form_fields');
	},
};
