const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function register({ username, email, password, role }) {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already in use');

  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password_hash, role });
  return sanitize(user);
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return { token, user: sanitize(user) };
}

function sanitize(user) {
  const { password_hash, ...safe } = user.toJSON();
  return safe;
}

module.exports = { register, login };
