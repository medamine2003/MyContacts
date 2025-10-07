# 📇 My Contacts — Application MERN (React + Node + Express + MongoDB)

Une application complète de gestion de contacts avec authentification JWT, CRUD complet et déploiement cloud (Vercel + Render).  
Permet de créer, modifier, supprimer et afficher ses contacts personnels après connexion.

---

## 🚀 Fonctionnalités principales

- 🔐 **Authentification avec JWT** (login / register)
- 📋 **CRUD complet** sur les contacts
- ✅ **Protection des routes** côté front et back
- ⚙️ **Architecture claire** côté client (services, pages, components)
- 🌍 **Déploiement** :
  - Frontend : **Vercel**
  - Backend API : **Render**
- 💄 **UI avec Bootstrap 5**

---

## 🧩 Architecture du projet

```
📦 my-contacts/
├── backend/                # Serveur Node/Express (déployé sur Render)
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── contacts.js
│   ├── models/
│   │   ├── User.js
│   │   └── Contact.js
│   ├── controllers/
│   ├── middleware/
│   └── .env
│
├── frontend/               # Application React (déployée sur Vercel)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── services/
│   │   │   ├── authServices.js
│   │   │   └── contactServices.js
│   │   ├── config/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation et configuration

### 1. Cloner le projet

```bash
git clone https://github.com/ton-compte/my-contacts.git
cd my-contacts
```

### 2. Configurer le backend

```bash
cd backend
npm install
```

#### 🧾 Fichier `.env`

Crée un fichier `.env` à la racine du dossier `backend` :

```env
PORT=8000
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/mycontacts
JWT_SECRET=yourSuperSecretKey
CORS_ORIGIN=https://my-contacts-iota.vercel.app
```

### 3. Lancer le backend

```bash
npm start
```

ou en mode développement :

```bash
npm run dev
```

**Par défaut :** 👉 `http://localhost:8000/api`

### 4. Configurer le frontend

```bash
cd ../frontend
npm install
```

#### ⚙️ Fichier `src/config/api.js`

```javascript
// Exemple : API Render
const API_URL = "https://my-contacts-api.onrender.com";
export default API_URL;
```

### 5. Lancer le frontend

```bash
npm run dev
```

**Par défaut :** 👉 `http://localhost:5173`

---

## 💻 Scripts utiles

### Frontend (React)

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le front en mode développement |
| `npm run build` | Génère la version de production |
| `npm run preview` | Teste la version buildée localement |

### Backend (Node)

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur avec nodemon |
| `npm start` | Démarre le serveur en production |

---

## 🔌 Endpoints principaux (API REST)

### 🧍‍♂️ Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/auth/register` | Créer un nouvel utilisateur |
| `POST` | `/api/auth/login` | Se connecter et recevoir un token JWT |

**Exemple de réponse (login) :**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

### 📇 Contacts

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/contacts` | Récupérer la liste des contacts |
| `POST` | `/api/contacts` | Créer un nouveau contact |
| `PATCH` | `/api/contacts/:id` | Modifier un contact |
| `DELETE` | `/api/contacts/:id` | Supprimer un contact |

**Exemple de contact :**

```json
{
  "_id": "66cde8c03b91c8f1f024",
  "firstName": "john",
  "lastName": "doe",
  "phone": "+888850011222"
}
```

---

## 🔑 Identifiants de test

| Email | Mot de passe |
|-------|--------------|
| `testuser@example.com` | `123456` |

---

## 🔒 Sécurité

- Toutes les routes `/api/contacts` sont **protégées par JWT**.
- Le token est stocké dans `localStorage` après connexion.
- Le front ajoute automatiquement le header :

```
Authorization: Bearer <token>
```

---

## 🌐 Déploiement

### Frontend — Vercel

- Déployé depuis le dossier `frontend/`
- Configuration :

```bash
vercel --prod
```

### Backend — Render

- Dossier : `backend/`
- Commande de démarrage : `npm start`
- Build command : `npm install`
- **Variables d'environnement :** (`PORT`, `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN`)

---

## 🧠 Notes techniques

- ⚛️ **React 19** + **Vite**
- 🧰 **Bootstrap 5**
- 🔄 **Axios** pour les requêtes API
- 🧱 **Node.js** + **Express**
- 🗄️ **MongoDB** (Mongoose)
- 🔐 **JWT** pour la sécurité
- 🌍 **CORS** configuré pour le domaine Vercel

---

## 🧪 Tests rapides

### 1. Authentification

```bash
POST /api/auth/login
{
  "email": "testuser@example.com",
  "password": "123456"
}
```

### 2. CRUD Contacts

```bash
GET /api/contacts
Authorization: Bearer <token>
```

---

## 🧰 Améliorations futures

- 🔄 Pagination des contacts
- 🔍 Recherche et filtrage
- 🧑‍💻 Upload photo de profil
- 📱 Responsive design complet
- 🧩 Intégration avec un backend Symfony (optionnel)

---

## 👨‍💻 Auteur

**Développé par :** Mohamed Amine Aissaoui

---

## 📄 Licence

Ce projet est sous licence MIT.