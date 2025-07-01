const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const { addPaletteEndpoints } = require('./colores');

const USERS_FILE = path.join(__dirname, 'users.json');

// Usuario administrador predefinido
const adminUser = {
  id: 1,
  firstName: 'Juan',
  lastName: '',
  maidenName: '',
  age: null,
  gender: '',
  email: 'juan123@gmail.com',
  phone: '',
  username: 'juan',
  password: '123456rt',
  birthDate: '',
  image: '',
  bloodGroup: '',
  height: null,
  weight: null,
  eyeColor: '',
  hair: { color: '', type: '' },
  ip: '',
  address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: null, lng: null }, country: '' },
  macAddress: '',
  university: '',
  bank: { cardExpire: '', cardNumber: '', cardType: '', currency: '', iban: '' },
  company: { department: '', name: '', title: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: null, lng: null }, country: '' } },
  ein: '',
  ssn: '',
  userAgent: '',
  crypto: { coin: '', wallet: '', network: '' },
  role: 'admin'
};

// Inicializar archivo de usuarios si no existe
function initUsersFile() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([adminUser], null, 2));
  }
}

// Leer usuarios del archivo
function readUsers() {
  initUsersFile();
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Guardar usuarios en el archivo
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Endpoint de registro
app.post('/api/register', (req, res) => {
  const { email, password, ...rest } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
  }
  const users = readUsers();
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'El email ya está registrado.' });
  }
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = {
    id: newId,
    email,
    password,
    role: 'customer',
    ...rest
  };
  // Completar campos vacíos según el dummyjson
  const dummy = {
    firstName: '', lastName: '', maidenName: '', age: null, gender: '', phone: '', username: '', birthDate: '', image: '', bloodGroup: '', height: null, weight: null, eyeColor: '', hair: { color: '', type: '' }, ip: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: null, lng: null }, country: '' }, macAddress: '', university: '', bank: { cardExpire: '', cardNumber: '', cardType: '', currency: '', iban: '' }, company: { department: '', name: '', title: '', address: { address: '', city: '', state: '', stateCode: '', postalCode: '', coordinates: { lat: null, lng: null }, country: '' } }, ein: '', ssn: '', userAgent: '', crypto: { coin: '', wallet: '', network: '' }
  };
  const user = { ...dummy, ...newUser };
  users.push(user);
  writeUsers(users);
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json(userWithoutPassword);
});

// Endpoint de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
  }
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.get('/api/users', (req, res) => {
  const users = readUsers();
  // Excluir la contraseña de cada usuario
  const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
  res.json(usersWithoutPasswords);
});

// Agregar endpoints de paleta de colores
addPaletteEndpoints(app);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
}); 