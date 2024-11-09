const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { body } = require('express-validator');

// Create a new form
router.post(
	'/',
	authenticate,
	authorize(['admin', 'editor']),
	[
		body('title').notEmpty().withMessage('Title is required'),
		body('schema').notEmpty().withMessage('Form schema is required'),
	],
	formController.createForm
);

// Get all forms for the organization
router.get(
	'/',
	authenticate,
	authorize(['admin', 'editor', 'viewer']),
	formController.getForms
);

// Get a single form by ID
router.get(
	'/:formId',
	authenticate,
	authorize(['admin', 'editor', 'viewer']),
	formController.getFormById
);

// Additional routes for updating and deleting forms can be added here

module.exports = router;
