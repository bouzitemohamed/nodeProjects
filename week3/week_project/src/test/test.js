const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Todo = require('../models/Todos');

let authToken;

beforeAll(async () => {
  // NETTOIE la base de test et crée un utilisateur
  await User.deleteMany({});
  await Todo.deleteMany({});

  const user = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });

  authToken = user.body.data.token; // Récupère le token JWT
});

describe('Todo API', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test todo',
        priority: 'high'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data.todo).toHaveProperty('title', 'Test todo');
  });

  it('should get all todos', async () => {
    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('todos');
  });
});