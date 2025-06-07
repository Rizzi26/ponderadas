import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, TextInput, Button, Title, Paragraph } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Usuário Teste');
  const [email, setEmail] = useState('teste@example.com');
  const [phone, setPhone] = useState('(99) 99999-9999');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    Alert.alert('Perfil Salvo', 'Suas informações foram atualizadas com sucesso!');
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Meu Perfil" />
        {!isEditing ? (
          <Appbar.Action icon="pencil" onPress={() => setIsEditing(true)} />
        ) : (
          <Appbar.Action icon="content-save" onPress={handleSave} />
        )}
      </Appbar.Header>
      <View style={styles.content}>
        <Title style={styles.title}>Informações do Perfil</Title>
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          disabled={!isEditing}
        />
        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={!isEditing}
        />
        <TextInput
          label="Telefone"
          value={phone}
          onChangeText={setPhone}
          mode="outlined"
          style={styles.input}
          keyboardType="phone-pad"
          disabled={!isEditing}
        />
        {isEditing && (
          <Button mode="outlined" onPress={() => Alert.alert('Alterar Senha', 'Funcionalidade de alteração de senha em desenvolvimento.')} style={styles.button}>
            Alterar Senha
          </Button>
        )}
        {isEditing && (
          <Button mode="outlined" onPress={() => Alert.alert('Alterar Foto', 'Funcionalidade de alteração de foto de perfil em desenvolvimento.')} style={styles.button}>
            Alterar Foto de Perfil
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});

export default ProfileScreen;

