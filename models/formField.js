// models/formField.js
module.exports = (sequelize, DataTypes) => {
	const FormField = sequelize.define(
		'FormField',
		{
			form_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'forms',
					key: 'id',
				},
			},
			label: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			field_type: {
				type: DataTypes.ENUM,
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
				type: DataTypes.STRING,
				allowNull: true,
			},
			required: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			order: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			validation: {
				type: DataTypes.JSONB,
				allowNull: true,
			},
			conditional_logic: {
				type: DataTypes.JSONB,
				allowNull: true,
			},
		},
		{
			tableName: 'form_fields',
			underscored: true,
		}
	);

	FormField.associate = (models) => {
		FormField.belongsTo(models.Form, { foreignKey: 'form_id', as: 'form' });
		FormField.hasMany(models.FormFieldOption, {
			foreignKey: 'form_field_id',
			as: 'options',
		});
	};

	return FormField;
};
