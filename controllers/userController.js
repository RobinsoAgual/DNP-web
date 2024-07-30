const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.query;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Usuario no encontrado');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Credenciales inválidas');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
};

exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const newUser = new User({ email, password, role });
    await newUser.save();
    res.status(201).send('Usuario creado');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.viewUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Usuario no encontrado');
  }
  user.password = newPassword;
  await user.save();
  res.send('Contraseña actualizada');
};
