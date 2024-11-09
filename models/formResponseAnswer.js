// models/formResponseAnswer.js
module.exports = (sequelize, DataTypes) => {
	const FormResponseAnswer = sequelize.define(
		'FormResponseAnswer',
		{
			form_response_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'form_responses',
					key: 'id',
				},
			},
			form_field_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'form_fields',
					key: 'id',
				},
			},
			value: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			tableName: 'form_response_answers',
			underscored: true,
		}
	);

	FormResponseAnswer.associate = (models) => {
		FormResponseAnswer.belongsTo(models.FormResponse, {
			foreignKey: 'form_response_id',
			as: 'formResponse',
		});
		FormResponseAnswer.belongsTo(models.FormField, {
			foreignKey: 'form_field_id',
			as: 'formField',
		});
	};

	return FormResponseAnswer;
};
