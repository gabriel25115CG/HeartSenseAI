import express from 'express';
import { generateResponse } from '../controllers/ollamaController.js'; // Import du contrôleur

const router = express.Router();

// Route POST pour générer une réponse via l'API Ollama
router.post('/generate', generateResponse);

export default router;
