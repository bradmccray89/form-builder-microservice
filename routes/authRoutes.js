const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

router.post(
	'/register',
	[
		body('name').notEmpty().withMessage('Name is required'),
		body('email').isEmail().withMessage('Valid email is required'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters'),
		body('organizationId')
			.isInt()
			.withMessage('Organization ID must be an integer'),
	],
	authController.register
);

router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Valid email is required'),
		body('password').notEmpty().withMessage('Password is required'),
	],
	authController.login
);

module.exports = router;
