const JWT_SECRET = process.env.JWT_SECRET || 'emt_b2b_jwt_secret_tanhoang_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

module.exports = { JWT_SECRET, JWT_EXPIRES_IN };
