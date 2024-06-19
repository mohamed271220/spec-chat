const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    // Generate token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });

    // Store token in cookie
    res.cookie('token', token, {
        httpOnly: true, // Prevent XSS attacks (cross-site scripting)
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: 'strict', // CSRF protection (cross-site request forgery)
        secure: process.env.NODE_ENV === 'production' ? true : false // Serve secure cookies in production
    });
}

module.exports = generateToken;