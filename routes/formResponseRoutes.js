const express = require('express');
const router = express.Router();
const formResponseController = require('../controllers/formResponseController');
const authenticate = require('../middlewares/authenticate');

// Submit a form response (accessible to both authenticated and unauthenticated users)
router.post('/:formId', formResponseController.submitFormResponse);

// Get responses for a form (only accessible to authorized users)
router.get(
	'/:formId',
	authenticate,
	// You may want to add authorization middleware to restrict access
	formResponseController.getFormResponses
);

module.exports = router;
