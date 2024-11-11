'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('form_responses', 'form_link_id', {
			type: Sequelize.UUID,
			allowNull: true,
			references: {
				model: 'form_links',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
		});

		await queryInterface.addColumn('form_responses', 'respondent_email', {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('form_responses', 'form_link_id');
		await queryInterface.removeColumn('form_responses', 'respondent_email');
	},
};
