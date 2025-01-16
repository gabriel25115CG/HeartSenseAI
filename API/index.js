import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importer le package CORS
import { validateEnv } from './utils/validateEnv.js'; // Valider les variables d'env
import { authenticateToken } from './middleware/authMiddleware.js'; // Middleware d'authentification
import authRoutes from './routes/authRoutes.js';
import firestoreRoutes from './routes/firestoreRoutes.js';
import client from 'prom-client'; // Client Prometheus
import ollamaRoutes from './routes/ollamaRoutes.js'; // Routes pour l'API Ollama

// Charger les variables d'environnement
dotenv.config();

// Valider les variables d'environnement
validateEnv();

// Créer l'application Express
const app = express();

// Middleware pour parser les JSON
app.use(express.json());

// Configurer CORS pour autoriser toutes les origines
const corsOptions = {
  origin: '*', // Permet toutes les origines
  methods: 'GET,POST,PUT,PATCH,DELETE', // Méthodes autorisées
  allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
  credentials: true, // Permet les cookies et autres informations d'authentification
};
app.use(cors(corsOptions)); // Appliquer CORS à toutes les routes


// Route de base
app.get('/', (req, res) => {
  const name = process.env.NAME || 'Anonymous';
  res.send(`What are you doing here ${name}!`);
});

// Routes pour l'API Ollama
app.use('/api', ollamaRoutes);

// Middleware d'authentification pour certaines routes
app.use('/api/auth/updateUser', authenticateToken);

// Routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/firestore', firestoreRoutes);

// Route pour exposer les métriques à Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    console.error('Erreur lors de l\'exposition des métriques:', err);
    res.status(500).send('Erreur lors de l\'exposition des métriques.');
  }
});

// Démarrer le serveur
const port = parseInt(process.env.PORT, 10) || 3001; 
app.listen(port, '0.0.0.0', () => {
  console.log(`API server listening on port ${port}`);
});
