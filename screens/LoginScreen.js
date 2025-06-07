import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import { useRouter } from 'expo-router';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password') {
      Alert.alert('Login bem-sucedido', 'Você está logado!');
      router.push('/home'); 
    } else {
      Alert.alert('Erro de Login', 'E-mail ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Bem-vindo!</Title>
      <Paragraph style={styles.subtitle}>Faça login para continuar</Paragraph>
      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>
      <Button mode="text" onPress={() => Alert.alert('Redefinir Senha', 'Funcionalidade de redefinição de senha em desenvolvimento.')}>
        Esqueceu a senha?
      </Button>
      <Button mode="text" onPress={() => Alert.alert('Cadastro', 'Funcionalidade de cadastro em desenvolvimento.')}>
        Criar conta
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 8,
  },
});

export default LoginScreen;

