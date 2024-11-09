// controllers/formResponseController.js
const { FormResponse, FormResponseAnswer, FormField } = require('../models');

exports.submitFormResponse = async (req, res) => {
	const { formId } = req.params;
	const { answers } = req.body; // `answers` is an array of { field_id, value }

	try {
		// Verify that the form exists
		const form = await Form.findByPk(formId);
		if (!form) {
			return res.status(404).json({ error: 'Form not found' });
		}

		// Create a new FormResponse
		const formResponse = await FormResponse.create({
			form_id: formId,
			submitted_by: req.user ? req.user.id : null,
			submitted_at: new Date(),
		});

		// Iterate over each answer and create FormResponseAnswer entries
		for (const answer of answers) {
			const formField = await FormField.findOne({
				where: { id: answer.field_id, form_id: formId },
			});
			if (!formField) {
				// Optionally, handle invalid field IDs
				continue;
			}

			await FormResponseAnswer.create({
				form_response_id: formResponse.id,
				form_field_id: answer.field_id,
				value: answer.value,
			});
		}

		res.status(201).json({
			message: 'Form response submitted successfully',
			responseId: formResponse.id,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to submit form response' });
	}
};

exports.getFormResponses = async (req, res) => {
	try {
		const { formId } = req.params;

		// Check if the user has access to this form
		// You might want to add additional checks here

		const responses = await FormResponse.findAll({ where: { form_id: formId } });
		res.json(responses);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve form responses' });
	}
};
