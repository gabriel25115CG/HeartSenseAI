# Étape 1 : Utiliser l'image officielle de Node.js
FROM node:20

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install --production

# Étape 5 : Copier le reste de l'application
COPY . .

# Étape 6 : Copier le fichier .env dans le conteneur
COPY .env .env

# Étape 7 : Exposer le port (assurez-vous que votre API écoute ce port)
EXPOSE 3001

# Étape 8 : Démarrer l'application
CMD ["npm", "start"]

