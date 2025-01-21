import axios from 'axios';

// Fonction pour interagir avec l'API Ollama
export const generateResponse = async (req, res) => {
  const { model, prompt, stream } = req.body;

  // Validation des champs requis
  if (!model || !prompt) {
    return res.status(400).json({ error: 'Les champs "model" et "prompt" sont requis.' });
  }

  console.log('Requête reçue avec les données:', req.body); // Log des données de la requête

  // Définir l'URL de l'API Ollama
  const ollamaUrl = process.env.OLLAMA_URL || 'http://127.0.0.1:11434/api/generate';

  try {
    // Effectuer une requête POST vers l'API Ollama
    const response = await axios.post(
      ollamaUrl,
      { model, prompt, stream },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Réponse de l\'API Ollama:', response.data); // Log de la réponse de l'API Ollama

    // Retourner la réponse de l'API Ollama au client
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API Ollama:', error);

    // Gérer les erreurs de l'API Ollama
    if (error.response) {
      console.error('Détails de la réponse d\'Ollama:', error.response.data);
      return res.status(error.response.status).json({
        error: error.response.data || 'Erreur depuis l\'API Ollama',
      });
    }

    // Gérer d'autres types d'erreurs
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
