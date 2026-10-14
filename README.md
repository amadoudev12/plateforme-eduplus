# EduPlus

Plateforme éducative pour trouver, consulter et déposer gratuitement des sujets (partiels, examens, TD, concours...).

Ce dépôt contient le site (Next.js + Tailwind). L'API est dans un dépôt séparé : **eduplus-backend** (Express + Prisma + PostgreSQL + Cloudinary).

## Installation

```bash
npm install
```

Le site a besoin du backend pour fonctionner : l'installer et le lancer depuis son propre dépôt (voir son README).

## Lancer le projet en local

```bash
# Dans le dossier du backend : API sur http://localhost:4000
npm run dev

# Dans ce dossier : site sur http://localhost:3000
npm run dev
```

Si le backend tourne sur une autre adresse que `http://localhost:4000`, copier `.env.example` en `.env.local` et y mettre son adresse dans `BACKEND_URL`.

## Comment le site parle au backend

Le navigateur appelle toujours `/api/...` sur l'adresse du site, et Next transmet la demande au backend (voir `next.config.ts`).
Le cookie de connexion appartient ainsi au site lui-même : il n'est pas bloqué par Safari, comme le serait un cookie posé par un autre domaine.

## Mise en ligne sur Vercel

1. Mettre d'abord le backend en ligne sur Render (voir le README du backend) et noter son adresse.
2. Sur Vercel : **Add New > Project**, choisir ce dépôt et garder le dossier racine (`./`).
3. Ajouter la variable `BACKEND_URL` avec l'adresse du backend, sans `/api` à la fin (ex : `https://eduplus-backend.onrender.com`).
4. Déployer. Si `BACKEND_URL` change plus tard, il faut redéployer le site pour qu'elle soit prise en compte.

## Organisation

```text
src/app/
├── components/   éléments partagés (navigation, carte de sujet, champs, styles communs dans ui.tsx)
├── lib/api.ts    appels au backend
└── */page.tsx    une page par dossier (cours, depot, profil, connexion...)
```
