# Utiliser une image Debian comme base
FROM node:20-bullseye-slim

# Installer Node.js 22 et Angular CLI
RUN apt-get update && apt-get install -y \
    curl \
    gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g @angular/cli

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Supprimer le cache npm et le répertoire node_modules
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm cache clean --force


# Installer les dépendances
RUN npm install 

RUN npm i


# Copier le reste des fichiers
COPY . .

# Exposer le port
EXPOSE 4200

# Commande pour démarrer Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
