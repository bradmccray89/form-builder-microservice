// models/form.js
module.exports = (sequelize, DataTypes) => {
	const Form = sequelize.define(
		'Form',
		{
			title: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.TEXT },
			created_by: { type: DataTypes.INTEGER, allowNull: false },
			organization_id: { type: DataTypes.INTEGER, allowNull: false },
		},
		{
			tableName: 'forms',
			underscored: true,
		}
	);

	Form.associate = (models) => {
		Form.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
		Form.belongsTo(models.Organization, {
			foreignKey: 'organization_id',
			as: 'organization',
		});
		Form.hasMany(models.FormField, { foreignKey: 'form_id', as: 'fields' });
		Form.hasMany(models.FormResponse, { foreignKey: 'form_id', as: 'responses' });
	};

	return Form;
};
