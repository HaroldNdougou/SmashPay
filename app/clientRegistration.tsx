import axios from 'axios'; // Assurez-vous d'installer axios : npm install axios
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// Remplacez cette URL par l'adresse IP de votre machine et le port de votre backend
// Si vous utilisez un émulateur Android, vous devrez peut-être utiliser 10.0.2.2 ou votre IP locale.
// Si vous utilisez iOS/Expo Go, utilisez l'adresse IP locale de votre machine (par exemple, http://192.168.1.10:3000)
const API_URL = 'http://192.168.1.10:3000/api/clients'; 

const ClientRegistration = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation simple
    if (!phoneNumber || !secretCode || !firstName) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, {
        numero_de_telephone: phoneNumber,
        code_secret: secretCode,
        prenom: firstName,
      });

      // Le statut 201 est souvent utilisé pour la création réussie
      if (response.status === 201) {
        Alert.alert('Succès 🎉', 'Client enregistré avec succès!');
        // Réinitialiser le formulaire
        setPhoneNumber('');
        setSecretCode('');
        setFirstName('');
      } else {
        // Gérer d'autres codes de statut potentiels du backend
        Alert.alert('Erreur', 'Échec de l\'enregistrement du client.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du client:', error);
      // Afficher un message d'erreur plus convivial
      Alert.alert('Erreur de connexion', 'Impossible de se connecter au serveur. Vérifiez que votre backend est en cours d\'exécution et que l\'URL est correcte.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription Client</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Numéro de Téléphone"
        placeholderTextColor="#666"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Code Secret"
        placeholderTextColor="#666"
        value={secretCode}
        onChangeText={setSecretCode}
        secureTextEntry={true} // Masque le texte pour le code secret
      />
      
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor="#666"
        value={firstName}
        onChangeText={setFirstName}
      />
      
      <Button
        title={isLoading ? "Enregistrement en cours..." : "Enregistrer le Client"}
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    textShadowColor: 'blue',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default ClientRegistration;