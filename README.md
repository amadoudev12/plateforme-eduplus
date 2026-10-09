# EduPlus

Plateforme éducative pour trouver, consulter et déposer gratuitement des sujets (devoirs, exercices, examens...).

- **Frontend** : Next.js + Tailwind (dossier `src/`)
- **Backend** : Express + Prisma (dossier `backend/`)
- **Base de données** : PostgreSQL

## Installation

```bash
# Frontend (à la racine du projet)
npm install

# Backend
cd backend
npm install
```

Copier `backend/.env.example` en `backend/.env`, puis remplir le mot de passe PostgreSQL dans `DATABASE_URL` et choisir une longue valeur aléatoire pour `JWT_SECRET`.

Créer ensuite la base et ses tables :

```bash
cd backend
npm run migrer   # crée la base "eduplus" et applique les migrations
npm run seed     # ajoute des données de développement (facultatif)
```

Comptes de test créés par `npm run seed` (développement uniquement) :

| Email | Mot de passe | Rôle |
|---|---|---|
| eleve@eduplus.dev | motdepasse123 | élève |
| admin@eduplus.dev | motdepasse123 | admin |

## Lancer le projet

Il faut deux terminaux :

```bash
# Terminal 1 : backend sur http://localhost:4000
cd backend
npm run dev

# Terminal 2 : frontend sur http://localhost:3000
npm run dev
```

## Organisation du backend

```text
backend/
├── prisma/schema.prisma   tables de la base de données
├── prisma/seed.js         données de développement
├── routes/                adresses de l'API
├── controllers/           ce que fait chaque route
├── middlewares/           vérification de la connexion, réception des fichiers
├── fichiers/              fichiers déposés par les utilisateurs (non versionnés)
└── server.js              point d'entrée
```

## Routes de l'API

| Méthode | Adresse | Rôle | Connexion requise |
|---|---|---|---|
| POST | `/api/auth/inscription` | Créer un compte | non |
| POST | `/api/auth/connexion` | Se connecter | non |
| POST | `/api/auth/deconnexion` | Se déconnecter | non |
| GET | `/api/auth/moi` | Utilisateur connecté (ou `null`) | non |
| GET | `/api/sujets` | Liste des sujets, filtres `recherche`, `matiere`, `niveau`, `type`, `annee` | non |
| GET | `/api/sujets/mes-sujets` | Sujets de l'utilisateur connecté | oui |
| GET | `/api/sujets/:id/fichier` | Afficher le fichier d'un sujet | non |
| GET | `/api/sujets/:id/telecharger` | Télécharger le fichier d'un sujet | non |
| POST | `/api/sujets` | Déposer un sujet (avec fichier) | oui |
| DELETE | `/api/sujets/:id` | Supprimer un sujet (auteur ou admin) | oui |
