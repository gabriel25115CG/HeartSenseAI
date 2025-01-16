import axios from 'axios';

// Fonction pour interagir avec l'API Ollama
export const generateResponse = async (req, res) => {
  const { model, prompt, stream } = req.body;

  // Validation des champs requis
  if (!model || !prompt) {
    return res.status(400).json({ error: 'Les champs "model" et "prompt" sont requis.' });
  }

  try {
    // Effectuer une requête POST vers l'API Ollama
    const response = await axios.post('http://localhost:11434/api/generate', {
      model,
      prompt,
      stream,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Retourner la réponse de l'API Ollama au client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API Ollama:', error.message);

    // Gérer les erreurs de l'API Ollama
    if (error.response) {
      // L'API Ollama a renvoyé une réponse d'erreur
      return res.status(error.response.status).json({
        error: error.response.data || 'Erreur depuis l\'API Ollama',
      });
    }

    // Si c'est une erreur réseau ou autre erreur non liée à la réponse de l'API
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'Impossible de se connecter à l\'API Ollama. Serveur non disponible.' });
    }

    // Gérer d'autres types d'erreurs (exemple: erreur de requête malformée)
    return res.status(500).json({ error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' });
  }
};
