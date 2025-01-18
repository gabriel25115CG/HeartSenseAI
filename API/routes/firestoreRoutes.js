import express from 'express';
import admin from '../config/firebaseConfig.js'; 
import { addDocument, getDocument } from '../controllers/FirestoreController.js';

const router = express.Router();
const db = admin.firestore();

// Route pour ajouter une conversation (créée lors du démarrage d'une nouvelle conversation)
router.post('/addConversation', async (req, res) => {
  const { userId, firstMessage } = req.body;

  try {
    // Vérifier que les paramètres nécessaires sont présents
    if (!userId || !firstMessage) {
      return res.status(400).json({ error: 'userId et firstMessage sont nécessaires.' });
    }

    // Créer une sous-collection "conversations" sous l'utilisateur
    const userRef = db.collection('users').doc(userId);
    const conversationRef = userRef.collection('conversations').doc();  // ID généré automatiquement par Firestore

    const conversationData = {
      messages: [
        {
          sender: 'ai',  // L'IA envoie un message initial
          text: firstMessage,  // Message de bienvenue
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        }
      ],
    };

    await conversationRef.set(conversationData);  // Sauvegarder la conversation
    res.status(200).json({ message: 'Conversation créée avec succès', conversationId: conversationRef.id });
  } catch (error) {
    console.error('Erreur lors de la création de la conversation:', error.message);
    res.status(500).json({ error: 'Erreur lors de la création de la conversation' });
  }
});

// Route pour ajouter un message à une conversation existante
router.post('/addMessageToConversation', async (req, res) => {
  const { userId, conversationId, sender, text } = req.body;

  try {
    // Vérifier la présence des paramètres nécessaires
    if (!userId || !conversationId || !sender || !text) {
      return res.status(400).json({ error: 'userId, conversationId, sender, et text sont nécessaires.' });
    }

    // Référence à la conversation spécifique sous l'utilisateur
    const userRef = db.collection('users').doc(userId);
    const conversationRef = userRef.collection('conversations').doc(conversationId);

    // Récupérer le document de la conversation
    const conversationDoc = await conversationRef.get();

    // Si la conversation n'existe pas, retourner une erreur 404
    if (!conversationDoc.exists) {
      return res.status(404).json({ error: 'Conversation non trouvée' });
    }

    // Ajouter le message dans la conversation
    const message = {
      sender: sender,  // 'user' ou 'ai'
      text: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Mettre à jour la conversation avec le nouveau message
    await conversationRef.update({
      messages: admin.firestore.FieldValue.arrayUnion(message),  // Ajouter le message dans l'array
    });

    res.status(200).json({ message: 'Message ajouté à la conversation' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du message:', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du message' });
  }
});

// Route pour récupérer l'historique des messages d'une conversation
router.get('/getConversationHistory/:userId/:conversationId', async (req, res) => {
  const { userId, conversationId } = req.params;

  try {
    // Vérifier que les paramètres sont présents
    if (!userId || !conversationId) {
      return res.status(400).json({ error: 'userId et conversationId sont nécessaires.' });
    }

    // Référence à l'utilisateur et à la conversation
    const userRef = db.collection('users').doc(userId);
    const conversationRef = userRef.collection('conversations').doc(conversationId);

    // Récupérer le document de la conversation
    const conversationDoc = await conversationRef.get();

    // Si la conversation n'existe pas, retourner une erreur 404
    if (!conversationDoc.exists) {
      return res.status(404).json({ error: 'Conversation non trouvée' });
    }

    const conversationData = conversationDoc.data();
    const messages = conversationData.messages;

    // Retourner l'historique des messages
    res.status(200).json({ history: messages });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique de la conversation' });
  }
});

export default router;
