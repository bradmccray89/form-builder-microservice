// models/formResponse.js
module.exports = (sequelize, DataTypes) => {
	const FormResponse = sequelize.define(
		'FormResponse',
		{
			form_id: { type: DataTypes.INTEGER, allowNull: false },
			submitted_by: { type: DataTypes.INTEGER, allowNull: true },
			submitted_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			form_link_id: { type: DataTypes.UUID, allowNull: true },
			respondent_email: { type: DataTypes.STRING, allowNull: true },
		},
		{
			tableName: 'form_responses',
			underscored: true,
		}
	);

	FormResponse.associate = (models) => {
		FormResponse.belongsTo(models.Form, { foreignKey: 'form_id', as: 'form' });
		FormResponse.belongsTo(models.User, {
			foreignKey: 'submitted_by',
			as: 'submitter',
		});
		FormResponse.belongsTo(models.FormLink, {
			foreignKey: 'form_link_id',
			as: 'formLink',
		});
		FormResponse.hasMany(models.FormResponseAnswer, {
			foreignKey: 'form_response_id',
			as: 'answers',
		});
	};

	return FormResponse;
};
