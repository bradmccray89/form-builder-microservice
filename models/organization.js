module.exports = (sequelize, DataTypes) => {
	const Organization = sequelize.define('Organization', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Organization.associate = (models) => {
		Organization.hasMany(models.User, {
			foreignKey: 'organization_id',
			as: 'users',
		});
		Organization.hasMany(models.Form, {
			foreignKey: 'organization_id',
			as: 'forms',
		});
	};

	return Organization;
};
