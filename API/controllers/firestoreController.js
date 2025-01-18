import admin from '../config/firebaseConfig.js';

const db = admin.firestore();

// Ajouter un document (modification pour la conversation)
export const addDocument = async (req, res) => {
  const { collection, docId, data } = req.body;

  try {
    if (!collection || !docId || !data) {
      return res.status(400).json({ error: 'collection, docId, et data sont nécessaires.' });
    }

    const docRef = db.collection(collection).doc(docId);

    // Ajouter ou mettre à jour le document
    await docRef.set(data, { merge: true }); // `merge: true` permet de fusionner les données au lieu de les écraser.

    res.status(200).json({ message: 'Document ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du document:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du document: ' + error.message });
  }
};

// Lire un document depuis Firestore
export const getDocument = async (req, res) => {
  const { collection, docId } = req.params;

  try {
    if (!collection || !docId) {
      return res.status(400).json({ error: 'collection et docId sont nécessaires.' });
    }

    const docRef = db.collection(collection).doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Document non trouvé' });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    console.error('Erreur lors de la lecture du document:', error);
    res.status(500).json({ error: 'Erreur lors de la lecture du document: ' + error.message });
  }
};
