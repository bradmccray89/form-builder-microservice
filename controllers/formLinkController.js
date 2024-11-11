// controllers/formLinkController.js
const {
	FormLink,
	Form,
	FormResponse,
	FormResponseAnswer,
	FormField,
} = require('../models');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const generateToken = () => {
	return uuidv4(); // Generates a unique UUID
};

exports.createFormLink = async (req, res) => {
	try {
		const { form_id, recipient_email, expiration_date } = req.body;

		// Validate form existence
		const form = await Form.findByPk(form_id);
		if (!form) {
			return res.status(404).json({ error: 'Form not found' });
		}

		// Generate unique token
		const token = generateToken();

		// Create FormLink
		const formLink = await FormLink.create({
			form_id,
			recipient_email,
			token,
			expiration_date: expiration_date ? new Date(expiration_date) : null,
			created_by: req.user.id, // Assuming req.user is populated by authentication middleware
		});

		// TODO: Send email to recipient with the link (handled by frontend or another service)

		res.status(201).json({
			message: 'Form link created successfully',
			formLink: {
				id: formLink.id,
				form_id: formLink.form_id,
				recipient_email: formLink.recipient_email,
				token: formLink.token,
				expiration_date: formLink.expiration_date,
				is_active: formLink.is_active,
			},
		});
	} catch (error) {
		console.error('Error creating form link:', error);
		res.status(500).json({ error: 'Failed to create form link' });
	}
};

exports.getFormByToken = async (req, res) => {
	try {
		const { token } = req.params;

		// Find FormLink by token
		const formLink = await FormLink.findOne({
			where: { token, is_active: true },
			include: [
				{
					model: Form,
					as: 'form',
					include: [
						{
							model: FormField,
							as: 'fields',
							include: [
								{
									model: FormFieldOption,
									as: 'options',
								},
							],
						},
					],
				},
			],
		});

		if (!formLink) {
			return res.status(404).json({ error: 'Invalid or inactive form link' });
		}

		// Check for expiration
		if (formLink.expiration_date && new Date() > formLink.expiration_date) {
			return res.status(400).json({ error: 'Form link has expired' });
		}

		res.json({
			form: {
				id: formLink.form.id,
				title: formLink.form.title,
				description: formLink.form.description,
				fields: formLink.form.fields.map((field) => ({
					id: field.id,
					label: field.label,
					field_type: field.field_type,
					placeholder: field.placeholder,
					required: field.required,
					order: field.order,
					validation: field.validation,
					conditional_logic: field.conditional_logic,
					options: field.options
						? field.options.map((option) => ({
								value: option.value,
								label: option.label,
						  }))
						: [],
				})),
			},
		});
	} catch (error) {
		console.error('Error retrieving form by token:', error);
		res.status(500).json({ error: 'Failed to retrieve form' });
	}
};

exports.submitFormViaToken = async (req, res) => {
	try {
		const { token } = req.params;
		const { answers } = req.body; // Array of { field_id, value }

		// Validate FormLink
		const formLink = await FormLink.findOne({
			where: { token, is_active: true },
			include: [
				{
					model: Form,
					as: 'form',
					include: [
						{
							model: FormField,
							as: 'fields',
						},
					],
				},
			],
		});

		if (!formLink) {
			return res.status(404).json({ error: 'Invalid or inactive form link' });
		}

		// Check for expiration
		if (formLink.expiration_date && new Date() > formLink.expiration_date) {
			return res.status(400).json({ error: 'Form link has expired' });
		}

		// Create FormResponse
		const formResponse = await FormResponse.create({
			form_id: formLink.form_id,
			form_link_id: formLink.id,
			respondent_email: formLink.recipient_email,
			submitted_at: new Date(),
		});

		// Validate and store answers
		for (const answer of answers) {
			const field = formLink.form.fields.find((f) => f.id === answer.field_id);
			if (!field) {
				// Optionally, handle invalid field IDs
				continue;
			}

			// Optionally, add server-side validation based on field_type and validation rules

			await FormResponseAnswer.create({
				form_response_id: formResponse.id,
				form_field_id: answer.field_id,
				value: answer.value,
			});
		}

		res.status(201).json({
			message: 'Form submitted successfully',
			responseId: formResponse.id,
		});
	} catch (error) {
		console.error('Error submitting form via token:', error);
		res.status(500).json({ error: 'Failed to submit form' });
	}
};

exports.submitFormAsAdmin = async (req, res) => {
	try {
		const { token } = req.params;
		const { answers, user_email } = req.body; // answers: Array of { field_id, value }, user_email: string

		// Validate FormLink
		const formLink = await FormLink.findOne({
			where: { token, is_active: true },
			include: [
				{
					model: Form,
					as: 'form',
					include: [
						{
							model: FormField,
							as: 'fields',
						},
					],
				},
			],
		});

		if (!formLink) {
			return res.status(404).json({ error: 'Invalid or inactive form link' });
		}

		// Check for expiration
		if (formLink.expiration_date && new Date() > formLink.expiration_date) {
			return res.status(400).json({ error: 'Form link has expired' });
		}

		// Optionally, verify that user_email matches formLink.recipient_email or allow overriding

		// Create FormResponse
		const formResponse = await FormResponse.create({
			form_id: formLink.form_id,
			form_link_id: formLink.id,
			submitted_by: req.user.id, // Admin user ID
			respondent_email: user_email || formLink.recipient_email,
			submitted_at: new Date(),
		});

		// Validate and store answers
		for (const answer of answers) {
			const field = formLink.form.fields.find((f) => f.id === answer.field_id);
			if (!field) {
				// Optionally, handle invalid field IDs
				continue;
			}

			// Optionally, add server-side validation based on field_type and validation rules

			await FormResponseAnswer.create({
				form_response_id: formResponse.id,
				form_field_id: answer.field_id,
				value: answer.value,
			});
		}

		res.status(201).json({
			message: 'Form submitted successfully by admin',
			responseId: formResponse.id,
		});
	} catch (error) {
		console.error('Error submitting form as admin:', error);
		res.status(500).json({ error: 'Failed to submit form' });
	}
};
