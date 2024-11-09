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

module.exports = router;
