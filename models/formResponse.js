module.exports = (sequelize, DataTypes) => {
	const FormResponse = sequelize.define(
		'FormResponse',
		{
			form_id: { type: DataTypes.INTEGER, allowNull: false },
			submitted_by: { type: DataTypes.INTEGER, allowNull: true },
			submitted_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
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
		FormResponse.hasMany(models.FormResponseAnswer, {
			foreignKey: 'form_response_id',
			as: 'answers',
		});
	};

	return FormResponse;
};
