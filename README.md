# Ticket Management Application

Une application moderne de gestion de tickets développée avec Next.js 14, permettant aux utilisateurs de créer, gérer et suivre des tickets de support.

## 🚀 Fonctionnalités

- ✅ Authentification utilisateur (NextAuth.js)
- 📝 Création et gestion de tickets
- 🔍 Filtrage des tickets par statut
- 📊 Tableau de bord avec statistiques
- 👥 Gestion des utilisateurs
- 🎨 Interface utilisateur moderne avec Shadcn/ui
- 🌓 Mode sombre/clair
- 📱 Design responsive

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshosts/dashboard.png)

### Page des tickets
![Tickets Page](./screenshosts/all%20titkets%20page.png)

### Page d'édition de ticket
![Edit Ticket](./screenshosts/edit%20ticket%20page.png)

### Page des utilisateurs
![Users Page](./screenshosts/users%20page.png)

## 🛠 Stack Technique

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Base de données**: MySQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentification**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context
- **Validation**: [Zod](https://zod.dev/)

## 🚀 Installation

1. Clonez le repository :
```bash
git clone https://github.com/BADZA99/tickets-management-app.git
```

2. Installez les dépendances :
```bash
cd tickets-management-app
npm install
```

3. Configurez les variables d'environnement :
```bash
# Créez un fichier .env à la racine du projet avec :
DATABASE_URL="mysql://user:password@localhost:3306/your_database"
NEXTAUTH_SECRET="votre-secret-ici"
NEXTAUTH_URL="http://localhost:3000"
```

4. Initialisez la base de données :
```bash
npx prisma migrate dev
```

5. Lancez le serveur de développement :
```bash
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📊 Structure de la Base de Données

### User
- id
- name
- username (unique)
- password
- role (USER, TECH, ADMIN)

### Ticket
- id
- title
- description
- status (OPEN, IN_PROGRESS, CLOSED)
- priority (LOW, MEDIUM, HIGH)
- assignedToUserId
- createdAt
- updatedAt

## 👥 Rôles Utilisateur

- **USER**: Peut créer et voir ses tickets
- **TECH**: Peut gérer les tickets qui lui sont assignés
- **ADMIN**: Accès complet à toutes les fonctionnalités

## 🛣 Routes API

- `POST /api/tickets` - Créer un nouveau ticket
- `GET /api/tickets` - Liste des tickets
- `PUT /api/tickets/[id]` - Mettre à jour un ticket
- `DELETE /api/tickets/[id]` - Supprimer un ticket
- `GET /api/users` - Liste des utilisateurs
- `PUT /api/users/[id]` - Mettre à jour un utilisateur

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request


## 👨‍💻 Auteur

- [@BADZA99](https://github.com/BADZA99)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
