// models/formLink.js
module.exports = (sequelize, DataTypes) => {
	const FormLink = sequelize.define(
		'FormLink',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			form_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Form',
					key: 'id',
				},
			},
			recipient_email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			expiration_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
			},
		},
		{
			tableName: 'form_links',
			underscored: true,
		}
	);

	FormLink.associate = (models) => {
		FormLink.belongsTo(models.Form, { foreignKey: 'form_id', as: 'form' });
		FormLink.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
		FormLink.hasMany(models.FormResponse, {
			foreignKey: 'form_link_id',
			as: 'responses',
		});
	};

	return FormLink;
};
