// controllers/formController.js
const { Form, FormField, FormFieldOption } = require('../models');

exports.createForm = async (req, res) => {
	const { title, description, fields } = req.body; // `fields` is an array of field objects

	try {
		const form = await Form.create({
			title,
			description,
			created_by: req.user.id,
			organization_id: req.user.organizationId,
		});

		// Iterate over each field and create FormField entries
		for (const field of fields) {
			const formField = await FormField.create({
				form_id: form.id,
				label: field.label,
				field_type: field.field_type,
				placeholder: field.placeholder || null,
				required: field.required || false,
				order: field.order || 0,
				validation: field.validation || null,
				conditional_logic: field.conditional_logic || null,
			});

			// If the field has options, create FormFieldOption entries
			if (field.options && Array.isArray(field.options)) {
				for (const option of field.options) {
					await FormFieldOption.create({
						form_field_id: formField.id,
						value: option.value,
						label: option.label,
					});
				}
			}
		}

		res
			.status(201)
			.json({ message: 'Form created successfully', formId: form.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create form' });
	}
};

exports.getForms = async (req, res) => {
	try {
		const forms = await Form.findAll({
			where: { organization_id: req.user.organizationId },
		});
		res.json(forms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve forms' });
	}
};

exports.getFormById = async (req, res) => {
	const { formId } = req.params;

	try {
		const form = await Form.findOne({
			where: { id: formId, organization_id: req.user.organizationId },
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
		});

		if (!form) {
			return res.status(404).json({ error: 'Form not found' });
		}

		res.json(form);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve form' });
	}
};

// Add other CRUD operations as needed
