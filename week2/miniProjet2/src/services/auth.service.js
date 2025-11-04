const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const userFile = path.join(__dirname, '../data/users.json');

function loadUsers() {
  if (!fs.existsSync(userFile)) return [];
  const data = fs.readFileSync(userFile);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));
}

async function register({ name, email, password }) {
  const users = loadUsers();
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword
  };
  users.push(newUser);
  saveUsers(users);
 return { token: process.env.TOKEN_SECRET, user: { id: newUser.id, name, email }
}
}

async function login({ email, password }) {
  const users = loadUsers();
  const user = users.find(u => u.email === email);
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');

  return { token: process.env.TOKEN_SECRET, user: { id: user.id, name: user.name, email } };
}

function logout() {
  return { message: 'Logout successful' };
}

module.exports = { register, login, logout };
