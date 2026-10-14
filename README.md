# EduPlus

Plateforme éducative pour trouver, consulter et déposer gratuitement des sujets (devoirs, exercices, examens...).

- **Frontend** : Next.js + Tailwind (dossier `src/`)
- **Backend** : Express + Prisma (dossier `backend/`)
- **Base de données** : PostgreSQL
- **Fichiers des sujets** : Cloudinary

## Installation

```bash
# Frontend (à la racine du projet)
npm install

# Backend
cd backend
npm install
```

Copier `backend/.env.example` en `backend/.env`, puis remplir le mot de passe PostgreSQL dans `DATABASE_URL` et choisir une longue valeur aléatoire pour `JWT_SECRET`.

Les fichiers des sujets sont stockés sur [Cloudinary](https://cloudinary.com) : créer un compte gratuit, puis copier la valeur « API environment variable » du tableau de bord dans `CLOUDINARY_URL`.

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

## Mise en ligne

Le frontend et le backend sont dans le même dépôt mais hébergés séparément : le frontend sur Vercel, le backend sur Render.
Le navigateur ne parle qu'au site Vercel : Next transmet les appels `/api/...` au backend (voir `next.config.ts`).

### 1. Base de données

Créer une base PostgreSQL en ligne (par exemple sur [Neon](https://neon.tech)) et copier son adresse de connexion.

### 2. Backend sur Render

1. Sur Render : **New > Blueprint**, choisir ce dépôt. Le fichier `render.yaml` configure le service (dossier `backend`).
2. Remplir les variables demandées :
   - `DATABASE_URL` : l'adresse de la base créée à l'étape 1
   - `CLOUDINARY_URL` : la même valeur que dans `backend/.env`
   - `FRONTEND_URL` : l'adresse du site Vercel (à compléter après l'étape 3)
3. Noter l'adresse du service, du type `https://eduplus-backend.onrender.com`.

Les tables sont créées automatiquement à chaque déploiement (`prisma migrate deploy`).

### 3. Frontend sur Vercel

1. Sur Vercel : **Add New > Project**, choisir ce dépôt et garder le dossier racine.
2. Ajouter la variable `BACKEND_URL` avec l'adresse du service Render, sans `/api` à la fin.
3. Déployer. Si `BACKEND_URL` change plus tard, il faut redéployer le site pour qu'elle soit prise en compte.

## Organisation du backend

```text
backend/
├── prisma/schema.prisma   tables de la base de données
├── prisma/seed.js         données de développement
├── routes/                adresses de l'API
├── controllers/           ce que fait chaque route
├── middlewares/           vérification de la connexion, réception des fichiers
├── utils/                 connexion à la base, envoi sur Cloudinary, cohérence des sujets
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

## Règles de dépôt d'un sujet

- Fichier PDF, DOC ou DOCX de 5 Mo maximum, dont le contenu correspond bien à l'extension.
- La matière, le titre, la description et le nom du fichier doivent parler de la même matière : un sujet déclaré en « Droit civil » dont le titre ou le fichier cite l'algèbre est refusé. Le contenu du fichier n'est pas analysé. La matière reste libre ; les disciplines reconnues dans les textes sont listées dans `backend/utils/coherenceSujet.js`.
