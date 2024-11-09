// models/formFieldOption.js
module.exports = (sequelize, DataTypes) => {
	const FormFieldOption = sequelize.define(
		'FormFieldOption',
		{
			form_field_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'form_fields',
					key: 'id',
				},
			},
			value: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			label: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'form_field_options',
			underscored: true,
		}
	);

	FormFieldOption.associate = (models) => {
		FormFieldOption.belongsTo(models.FormField, {
			foreignKey: 'form_field_id',
			as: 'formField',
		});
	};

	return FormFieldOption;
};
