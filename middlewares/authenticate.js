const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	// Get token from headers
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.status(401).json({ error: 'Access token missing' });

	// Verify token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: 'Invalid access token' });
		req.user = user;
		next();
	});
};
