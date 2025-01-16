import express from 'express';
import axios from 'axios'; // Pour effectuer une requête à l'API Ollama

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { model, prompt, stream } = req.body;

    // Validation des paramètres
    if (!model || !prompt) {
      return res.status(400).json({ error: 'Model and prompt are required.' });
    }

    // Requête à l'API Ollama
    const response = await axios.post('http://localhost:11434/api/generate', {
      model,
      prompt,
      stream,
    });

    // Retourner la réponse à l'utilisateur
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API Ollama:', error.message);
    res.status(500).json({ error: 'Une erreur est survenue.' });
  }
});

export default router;
