import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Para ícones de voltar e menu

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    birthdate: '',
    address: '',
    phone: '',
    active: true,
    bolsa_familia: false,
    attends_church: false,
    church_name: '',
  });
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar o menu toggle

  const handleSubmit = async () => {
    console.log('Botão Cadastrar clicado. Dados do formulário:', form);

    if (!form.name || !form.birthdate || !form.address || !form.phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let formattedBirthdate;
    try {
      const [day, month, year] = form.birthdate.split('/');
      formattedBirthdate = `${year}-${month}-${day}`;
      if (!day || !month || !year || year.length !== 4 || isNaN(new Date(formattedBirthdate).getTime())) {
        throw new Error('Data inválida');
      }
    } catch (error) {
      Alert.alert('Erro', 'Formato de data inválido. Use DD/MM/YYYY com um ano válido (ex.: 1989).');
      return;
    }

    const formattedForm = { ...form, birthdate: formattedBirthdate };
    console.log('Dados formatados:', formattedForm);

    try {
      const response = await axios.post('http://10.0.2.2:5000/api/users', formattedForm, { timeout: 30000 });
      console.log('Resposta do backend:', response.data);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (err) {
      console.log('Erro completo:', err.response ? err.response.data : err.message);
      Alert.alert('Erro', `Erro ao cadastrar: ${err.response ? err.response.data.error : err.message}`);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header com botão de voltar e menu toggle */}
        <View style={styles.header}>
          {/* Botão Voltar */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="arrow-back" size={30} color="#1E3A8A" />
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Botão de Menu Toggle */}
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Ionicons name={menuVisible ? 'close' : 'menu'} size={30} color="#1E3A8A" />
          </TouchableOpacity>
        </View>

        {/* Menu Toggle */}
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('Register');
              }}
            >
              <Text style={styles.menuText}>Cadastrar Usuários</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('List');
              }}
            >
              <Text style={styles.menuText}>Listar Usuários</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('Frequency');
              }}
            >
              <Text style={styles.menuText}>Frequência de Usuários</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Campo Nome Completo */}
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          {/* Campo Data de Nascimento */}
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={form.birthdate}
            onChangeText={(text) => setForm({ ...form, birthdate: text })}
          />

          {/* Campo Endereço */}
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço"
            value={form.address}
            onChangeText={(text) => setForm({ ...form, address: text })}
          />

          {/* Campo Telefone */}
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu telefone"
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
          />

          {/* Switch Ativo */}
          <View style={styles.switch}>
            <Text style={styles.label}>Ativo?</Text>
            <Switch value={form.active} onValueChange={(value) => setForm({ ...form, active: value })} />
          </View>

          {/* Switch Bolsa Família */}
          <View style={styles.switch}>
            <Text style={styles.label}>Recebe Bolsa Família?</Text>
            <Switch
              value={form.bolsa_familia}
              onValueChange={(value) => setForm({ ...form, bolsa_familia: value })}
            />
          </View>

          {/* Switch Frequenta Igreja */}
          <View style={styles.switch}>
            <Text style={styles.label}>Frequenta Igreja?</Text>
            <Switch
              value={form.attends_church}
              onValueChange={(value) => setForm({ ...form, attends_church: value })}
            />
          </View>

          {/* Campo Nome da Igreja (condicional) */}
          {form.attends_church && (
            <>
              <Text style={styles.label}>Nome da Igreja</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome da igreja"
                value={form.church_name}
                onChangeText={(text) => setForm({ ...form, church_name: text })}
              />
            </>
          )}

          {/* Botão Cadastrar */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(209, 231, 221, 0.8)', // Mesma transparência do App.js
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40, // Espaçamento no topo
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  menuButton: {
    padding: 10,
  },
  logo: {
    width: 250,
    height: 150,
  },
  menu: {
    backgroundColor: '#166534', // Mesmo verde do App.js
    position: 'absolute',
    top: 100, // Abaixo do header
    right: 20,
    width: 200,
    borderRadius: 10,
    padding: 10,
    zIndex: 1, // Garante que o menu fique acima dos outros elementos
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  label: {
    fontFamily: 'PoppinsBold', // Corrige para PoppinsRegular
    fontSize: 16,
    color: '#1E3A8A',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    backgroundColor: 'white',
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#166534',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 18,
  },
});