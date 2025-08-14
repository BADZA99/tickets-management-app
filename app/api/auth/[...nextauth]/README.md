# Implémentation de l'Authentification avec NextAuth.js

## Vue d'ensemble

Cette implémentation met en place un système d'authentification complet utilisant NextAuth.js avec les identifiants utilisateur (username/password). Le système est composé de trois fichiers principaux :

1. `options.ts` - Configuration de NextAuth
2. `route.ts` - Points d'entrée de l'API
3. `next-auth.d.ts` - Types TypeScript personnalisés

## Détail des Fichiers

### 1. `options.ts`

Ce fichier configure NextAuth avec :

```typescript
const options: NextAuthOptions = {
  providers: [...],
  callbacks: {...}
}
```

#### Providers
- Utilise `CredentialsProvider` pour l'authentification par username/password
- Configure les champs du formulaire de connexion (username et password)
- Implémente la logique d'authentification :
  - Recherche l'utilisateur dans la base de données via Prisma
  - Compare le mot de passe avec bcrypt
  - Retourne l'utilisateur si les identifiants sont valides

#### Callbacks
- `jwt` : Enrichit le token JWT avec le rôle de l'utilisateur
- `session` : Ajoute le rôle de l'utilisateur à la session

### 2. `route.ts`

Ce fichier crée les points d'entrée de l'API pour l'authentification :
- Expose les routes GET et POST nécessaires à NextAuth
- Utilise la configuration définie dans `options.ts`

### 3. `next-auth.d.ts`

Ce fichier étend les types TypeScript de NextAuth pour inclure nos données personnalisées :

#### Session
Ajoute à l'objet session :
- `username`: string
- `role`: string

#### User
Définit la structure de l'utilisateur :
- `id`: number
- `name`: string
- `username`: string
- `role`: string

#### JWT
Ajoute au token JWT :
- `role`: string (optionnel)

## Fonctionnement

1. Quand un utilisateur tente de se connecter :
   - Les identifiants sont envoyés au `CredentialsProvider`
   - La fonction `authorize` vérifie les identifiants
   - Si valides, un token JWT est créé

2. Pour chaque requête authentifiée :
   - Le token JWT est vérifié
   - La session est créée avec les informations de l'utilisateur
   - Le rôle est accessible dans toute l'application

3. Les types personnalisés permettent :
   - Un typage strict des données d'authentification
   - L'auto-complétion dans l'IDE
   - La détection d'erreurs à la compilation

## Utilisation

Pour utiliser l'authentification dans vos composants :

```typescript
import { useSession } from "next-auth/react";

const Component = () => {
  const { data: session } = useSession();
  
  if (session?.user.role === "ADMIN") {
    // Accès admin
  }
}
```

## Sécurité

- Les mots de passe sont hashés avec bcrypt
- Les tokens JWT sont signés
- Les rôles sont vérifiés côté serveur
- Les sessions sont gérées de manière sécurisée par NextAuth
