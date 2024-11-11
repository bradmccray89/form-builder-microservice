const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { body } = require('express-validator');

router.post(
	'/',
	authenticate,
	authorize(['admin']),
	[body('name').notEmpty().withMessage('Name is required')],
	organizationController.createOrganization
);

router.get(
	'/',
	authenticate,
	authorize(['admin']),
	organizationController.getOrganizations
);

router.get(
	'/:id',
	authenticate,
	authorize(['admin']),
	organizationController.getOrganizationById
);

router.put(
	'/:id',
	authenticate,
	authorize(['admin']),
	organizationController.updateOrganization
);

router.delete(
	'/:id',
	authenticate,
	authorize(['admin']),
	organizationController.deleteOrganization
);

router.post(
	'/:id/invite',
	authenticate,
	authorize(['admin']),
	organizationController.inviteUserToOrganization
);

router.post(
	'/:id/accept-invite',
	authenticate,
	organizationController.acceptOrganizationInvite
);

router.post(
	'/:id/leave',
	authenticate,
	organizationController.leaveOrganization
);

router.post(
	'/:id/remove-user',
	authenticate,
	authorize(['admin']),
	organizationController.removeUserFromOrganization
);

module.exports = router;
