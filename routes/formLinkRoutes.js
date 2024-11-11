// routes/formLinkRoutes.js
const express = require('express');
const router = express.Router();
const formLinkController = require('../controllers/formLinkController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Route to create a new form link (Admins only)
router.post(
	'/create',
	authenticate,
	authorize(['admin']),
	formLinkController.createFormLink
);

// Route to access a form via token (Public)
router.get('/:token', formLinkController.getFormByToken);

// Route to submit a form via token (Public)
router.post('/:token/submit', formLinkController.submitFormViaToken);

// Route for admins to fill out a form on behalf of a user
router.post(
	'/:token/submit-as-admin',
	authenticate,
	authorize(['admin']),
	formLinkController.submitFormAsAdmin
);

module.exports = router;
