import axios from 'axios'; // Assurez-vous d'installer axios : npm install axios
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// Remplacez cette URL par l'adresse IP de votre machine et le port de votre backend
// Si vous utilisez un émulateur Android, vous devrez peut-être utiliser 10.0.2.2 ou votre IP locale.
// Si vous utilisez iOS/Expo Go, utilisez l'adresse IP locale de votre machine (par exemple, http://192.168.1.10:3000)
const API_URL = 'http://172.20.10.3:3000/api/clients'; 

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

  
      if (response.status === 201) {
        Alert.alert('Succès 🎉', 'Client enregistré avec succès!');
        setPhoneNumber('');
        setSecretCode('');
        setFirstName('');
      } else {
        Alert.alert('Information', 'Requête réussie, mais statut inattendu.');
      }

    } catch (error) {
    console.error('Erreur lors de l\'enregistrement du client:', error);

    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      if (status === 400) {
          Alert.alert('Erreur', 'Données manquantes ou format invalide (400).');
      } else if (status === 409) {
          Alert.alert('Erreur', 'Ce numéro de téléphone est déjà enregistré.');
      } else if (status === 500) {
          Alert.alert('Erreur', 'Erreur interne du serveur (500).');
      } else {
          Alert.alert('Erreur Serveur', `Le serveur a répondu avec l'erreur: ${status}.`);
      }

    } else if (axios.isAxiosError(error) && error.request) {
      Alert.alert('Erreur de connexion', 'Impossible de se connecter au serveur. Vérifiez l\'URL et le statut du backend.');
    } else {
      Alert.alert('Erreur Inconnue', 'Une erreur s\'est produite avant l\'envoi de la requête.');
    }

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