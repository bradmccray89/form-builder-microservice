module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: { isEmail: true },
		},
		password_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	User.associate = (models) => {
		User.belongsTo(models.Organization, {
			foreignKey: 'organization_id',
			as: 'organization',
		});
		User.hasMany(models.Form, {
			foreignKey: 'created_by',
			as: 'forms',
		});
	};

	return User;
};
