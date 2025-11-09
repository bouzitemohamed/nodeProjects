# Todo Tracker Secure Edition

API REST sécurisée pour la gestion de tâches avec authentification JWT et base de données MongoDB.

## Installation

1. Cloner le projet
2. `npm install`
3. Créer le fichier `.env` (voir `.env.example`)
4. Démarrer MongoDB localement ou utiliser MongoDB Atlas
5. `npm run dev`

## Variables d'environnement

- `PORT=3000`
- `MONGODB_URI=mongodb://localhost:27017/todo-tracker`
- `JWT_SECRET=your-secret-key`
- `ALLOWED_ORIGINS=http://localhost:3000`

## Routes API

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Todos (Authentification requise)
- `GET /api/todos` - Liste avec filtres
- `POST /api/todos` - Créer une tâche
- `GET /api/todos/:id` - Détails
- `PATCH /api/todos/:id` - Mettre à jour
- `DELETE /api/todos/:id` - Supprimer
- `PATCH /api/todos/:id/toggle` - Basculer l'état

## Tests

`npm test`