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

exports.getOrganizationById = async (req, res) => {
	try {
		const organization = await Organization.findByPk(req.params.id);
		if (!organization) {
			return res.status(404).json({ error: 'Organization not found' });
		}
		res.json(organization);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve organization' });
	}
};

exports.updateOrganization = async (req, res) => {
	try {
		const organization = await Organization.findByPk(req.params.id);
		if (!organization) {
			return res.status(404).json({ error: 'Organization not found' });
		}
		const { name } = req.body;
		await organization.update({ name });
		res.json({ message: 'Organization updated successfully', organization });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update organization' });
	}
};

exports.deleteOrganization = async (req, res) => {
	try {
		const organization = await Organization.findByPk(req.params.id);
		if (!organization) {
			return res.status(404).json({ error: 'Organization not found' });
		}
		await organization.destroy();
		res.json({ message: 'Organization deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to delete organization' });
	}
};

exports.inviteUserToOrganization = async (req, res) => {
	try {
		const organization = await Organization.findByPk(req.params.id);
		if (!organization) {
			return res.status(404).json({ error: 'Organization not found' });
		}
		const { email } = req.body;
		// Logic to send an email invitation to the user
		res.json({ message: 'User invited to organization' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to invite user to organization' });
	}
};

exports.acceptOrganizationInvite = async (req, res) => {
	try {
		const organization = await Organization.findByPk(req.params.id);
		if (!organization) {
			return res.status(404).json({ error: 'Organization not found' });
		}
		// Logic to add the user to the organization
		res.json({ message: 'User added to organization' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to add user to organization' });
	}
};

exports.leaveOrganization = async (req, res) => {
	try {
		const organization = await Organization.findByPk(req.params.id);
		if (!organization) {
			return res.status(404).json({ error: 'Organization not found' });
		}
		// Logic to remove the user from the organization
		res.json({ message: 'User removed from organization' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to remove user from organization' });
	}
};

exports.removeUserFromOrganization = async (req, res) => {
	try {
		const organization = await Organization.findByPk(req.params.id);
		if (!organization) {
			return res.status(404).json({ error: 'Organization not found' });
		}
		const { userId } = req.body;
		// Logic to remove the user from the organization
		res.json({ message: 'User removed from organization' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to remove user from organization' });
	}
};
