const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta del archivo users.json
const usersFilePath = path.join(__dirname, 'users.json');

// Función para cargar los usuarios desde el archivo JSON
const loadUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Función para guardar los usuarios en el archivo JSON
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Endpoint para login
app.get('/login', (req, res) => {
  const { email, password } = req.query;

  // Verificar el dominio del correo electrónico
  if (!email.endsWith('@ups.edu.ec')) {
    return res.status(400).json({ message: 'El dominio del correo electrónico debe ser ups.edu.ec' });
  }

  const users = loadUsers();
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
  const role = user.role; // Asegúrate de que el rol se incluye en la respuesta

  res.json({ token, role });
});



// Endpoint para obtener todos los usuarios
app.get('/users', (req, res) => {
  const users = loadUsers();
  res.status(200).json(users);
});

// Función para validar el formato del correo electrónico
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@ups.edu.ec$/;
  return emailRegex.test(email);
};

// Función para validar la contraseña
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

// Endpoint para crear un nuevo usuario
app.post('/create-user', (req, res) => {
  let { email, password, role } = req.body;
  console.log('Request body:', req.body);  // Agregar para depuración

  if (!email || !password || role === undefined) {
    return res.status(400).json({ message: 'Email, password y rol son requeridos.' });
  }

  // Convertir role a número si es una cadena
  if (typeof role === 'string') {
    role = parseInt(role, 10);
  }

  if (isNaN(role)) {
    return res.status(400).json({ message: 'Rol inválido.' });
  }

  const users = loadUsers();
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe.' });
  }

  users.push({ email, password, role });
  saveUsers(users);

  res.status(201).json({ message: 'Usuario creado con éxito.' });
});



// Endpoint para cambiar la contraseña
app.put('/change-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email y nueva contraseña son requeridos.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'El dominio del correo electrónico debe ser ups.edu.ec.' });
  }

  if (!validatePassword(newPassword)) {
    return res.status(400).json({ message: 'La contraseña debe contar con mínimo 6 caracteres entre letras y números.' });
  }

  const users = loadUsers();
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado.' });
  }

  users[userIndex].password = newPassword;
  saveUsers(users);

  res.status(200).json({ message: 'Contraseña cambiada con éxito.' });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
