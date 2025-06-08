# Boilerplate Astro avec Stripe

Ce projet est un template de démarrage pour créer une application e-commerce avec Astro et Stripe. Il inclut une configuration de base pour gérer un panier d'achat et un processus de paiement sécurisé.

## 🚀 Prérequis

- Node.js 20 ou supérieur (développé avec Node.js 22)
- Un compte [Stripe](https://stripe.com/) pour gérer les paiements
- Un compte [Vercel](https://vercel.com/) (recommandé pour le déploiement)
- npm ou yarn comme gestionnaire de paquets

## 🛠 Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/boilerplate-astro-stripe.git
   cd boilerplate-astro-stripe
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```env
   STRIPE_SECRET_KEY=votre_clé_secrète_stripe
   STRIPE_PUBLISHABLE_KEY=votre_clé_publique_stripe
   STRIPE_WEBHOOK_SECRET=votre_secret_webhook_stripe
   ```

4. **Démarrer le serveur de développement** :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Ouvrir votre navigateur** :
   ```
   http://localhost:4321
   ```

## 🧑‍💻 Contributions

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Forker** le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/ma-nouvelle-fonctionnalite`)
3. **Commiter** vos modifications (`git commit -am 'Ajout d\'une nouvelle fonctionnalité'`)
4. **Pusher** vers la branche (`git push origin feature/ma-nouvelle-fonctionnalite`)
5. Ouvrir une **Pull Request**

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer selon les termes de la licence.

**Attribution** : Ce projet a été créé par EsperluWeb et est basé sur [Astro](https://astro.build/) et [Stripe](https://stripe.com/).

## 🙏 Remerciements

- [Astro](https://astro.build/) pour le framework web tout-en-un
- [Stripe](https://stripe.com/) pour la solution de paiement
- Tous les contributeurs qui ont aidé à améliorer ce projet