const { Organization } = require('../models');

exports.createOrganization = async (req, res) => {
	try {
		const { name } = req.body;
		const organization = await Organization.create({ name });
		res
			.status(201)
			.json({ message: 'Organization created successfully', organization });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create organization' });
	}
};

exports.getOrganizations = async (req, res) => {
	try {
		const organizations = await Organization.findAll();
		res.json(organizations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve organizations' });
	}
};
