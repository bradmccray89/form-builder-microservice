const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
	// Validate input
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { name, email, password, organizationId } = req.body;
		const passwordHash = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password_hash: passwordHash,
			role: 'editor', // Default role
			organization_id: organizationId,
		});

		res
			.status(201)
			.json({ message: 'User registered successfully', userId: user.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Registration failed' });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user)
			return res.status(400).json({ error: 'Invalid credentials Email' });

		const validPassword = await bcrypt.compare(password, user.password_hash);
		if (!validPassword)
			return res.status(400).json({ error: 'Invalid credentials Password' });

		// Create a JWT token expires in 1 hour
		const accessToken = jwt.sign(
			{
				id: user.id,
				role: user.role,
				organizationId: user.organization_id,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '1h' }
		);

		res.json({ accessToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Login failed' });
	}
};
