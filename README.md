# API Express + TypeScript + Prisma (MySQL)

## Prérequis

- Node.js (>= 18)
- npm
- MySQL (local ou distant)

---

## Installation

```bash
git clone <URL_DU_REPO>
cd apiexpress
npm install
```

---

## Configuration

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="mysql://express:password@localhost:3306/apiexpress"
PORT=3000
```

Adapte les valeurs selon ta configuration MySQL.

---

## Base de données

Assure-toi que :

- MySQL est lancé
- La base de données existe

```sql
CREATE DATABASE apiexpress;
```

- L'utilisateur a les droits :

```sql
GRANT ALL PRIVILEGES ON apiexpress.* TO 'express'@'localhost';
FLUSH PRIVILEGES;
```

---

## Prisma

Générer le client :

```bash
npx prisma generate
```

Appliquer les migrations :

```bash
npx prisma migrate dev
```

---

## Lancer le projet

```bash
npm run dev
```

---

## Tester l'API

Exemple :

- GET http://localhost:3000/users

---

## Workflow complet (nouveau PC)

```bash
git clone ...
cd apiexpress
npm install
cp .env.example .env
# modifier le .env
npx prisma migrate dev
npm run dev
```
