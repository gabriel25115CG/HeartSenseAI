# Étape 1 : Utiliser une image Node.js appropriée
FROM node:20 AS build

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances proprement
RUN npm ci

# Étape 5 : Installer Angular CLI globalement pour éviter les conflits de version
RUN npm install -g @angular/cli@latest

# Étape 6 : Copier le reste des fichiers du projet
COPY . .

# Étape 7 : Exposer le port 4200 (port par défaut pour Angular)
EXPOSE 4200

# Étape 8 : Lancer l'application en mode développement
CMD ["ng", "serve", "--host", "0.0.0.0"]
