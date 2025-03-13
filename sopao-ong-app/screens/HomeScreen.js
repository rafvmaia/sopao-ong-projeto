import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sopão ONG</Text>
      <Button title="Cadastrar Usuário" onPress={() => navigation.navigate('Register')} />
      <Button title="Listar Usuários" onPress={() => navigation.navigate('UserList')} />
      <Button title="Frequência" onPress={() => navigation.navigate('Frequency')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});