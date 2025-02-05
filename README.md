# 🌟 HeartSense 

Bienvenue dans **HeartSense**, une application moderne, puissante et 100 % open source conçue pour répondre à vos besoins en toute simplicité. Créée avec soin, cette solution est **faite maison**, entièrement **auto-hébergée**, et dédiée aux passionnés de liberté numérique et de transparence.

---

## 🚀 Fonctionnalités Principales

### 🌐 **Application auto-hébergée**
- Gardez un contrôle total sur vos données.
- Déployez facilement votre instance sur votre serveur.
- Aucun besoin de dépendances externes : tout est optimisé pour une utilisation privée.

### 🛠️ **Entièrement open source**
- Code source disponible sur [GitHub](#).
- Contributions bienvenues pour améliorer et enrichir le projet.
- Auditable pour garantir une transparence maximale.

### ✨ **Fait maison, pour tous**
- Conçu pour les petites équipes, les développeurs et les passionnés d'open source.
- Interface intuitive et fonctionnalités avancées, développées avec amour.

### 🔒 **Sécurisé et évolutif**
- Gestion des utilisateurs et permissions personnalisables.
- Optimisé pour une performance fluide sur des serveurs légers.

---

## 🎯 Objectifs du Projet

HeartSense vise à offrir une solution clé en main, simple à déployer et facile à adapter selon vos besoins. 
L’accent est mis sur :
- **Transparence** : Pas de surprise cachée. Vous contrôlez tout.
- **Liberté numérique** : Hébergez vos propres outils, sans dépendance à des services tiers.
- **Partage et communauté** : Une plateforme qui évolue grâce à vous.

---

## 📌 Prérequis

Avant de commencer, assurez-vous d’avoir installé les éléments suivants sur votre machine :
- **Node.js** (version 18 minimum) [Télécharger ici](https://nodejs.org/)
- **Angular CLI** (version 19) [Guide d'installation](https://angular.io/cli)
- **Docker** (si vous souhaitez utiliser la version conteneurisée)

---

## 🐳 Installation et exécution

### 🔧 Méthode 1 : Exécution locale (sans Docker)

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/gabriel25115CG/HeartSenseAI.git
   cd HeartSenseAI
   ```

2. **Installation et lancement de l'API** :
   ```bash
   cd API
   npm install
   node index.js
   ```

3. **Installation et lancement du frontend** :
   ```bash
   cd ../front
   npm install
   ng serve
   ```

4. **Accéder à l'application** :
   Ouvrez votre navigateur et rendez-vous sur :
   ```
   http://localhost:4200
   ```

---

### 🐳 Méthode 2 : Exécution avec Docker

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/gabriel25115CG/HeartSenseAI.git
   ```

2. **Lancer l’application avec Docker Compose** :
   ```bash 
   docker-compose up --build
   ```

---

## 🤖 Partie IA (Ollama)

Si vous souhaitez exécuter la partie IA avec Ollama, suivez ces étapes :

1. **Téléchargez et installez Ollama** sur votre machine.
   
   [Télécharger Ollama](https://ollama.ai/download)

2. **Lancer Ollama avec le modèle souhaité** :
   ```bash 
   ollama run llama3.2
   ```

---

## 📝 Contribution

Les contributions sont les bienvenues ! Si vous souhaitez proposer une amélioration, ouvrez une issue ou soumettez une pull request sur [GitHub](#).

---

## 📄 Licence

HeartSense est un projet open-source sous licence MIT. Consultez le fichier `LICENSE` pour plus d’informations.
