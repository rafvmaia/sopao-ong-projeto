import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Para ícones de voltar e menu

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar o menu toggle
  const [loading, setLoading] = useState(true); // Estado para rastrear o carregamento
  const [error, setError] = useState(null); // Estado para rastrear erros

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    console.log('Tentando listar usuários...');
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/users', { timeout: 30000 });
      console.log('Resposta da API:', JSON.stringify(response.data, null, 2));
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.log('Dados não são um array:', response.data);
        setUsers([]);
        setError('Os dados recebidos não estão no formato esperado (array).');
      }
    } catch (err) {
      console.log('Erro ao listar:', err.response ? err.response.data : err.message);
      const errorMessage = err.response?.data?.error || err.message || 'Erro de conexão com o servidor';
      setError(errorMessage);
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:5000/api/users/${id}`, { timeout: 30000 });
      fetchUsers();
      Alert.alert('Sucesso', 'Usuário deletado com sucesso!');
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Erro desconhecido';
      Alert.alert('Erro', errorMessage);
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
        {/* Header com botão de voltar, logo e menu toggle */}
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

        {/* Lista de Usuários */}
        <View style={styles.listContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : users.length === 0 ? (
            <Text style={styles.noDataText}>Nenhum usuário cadastrado.</Text>
          ) : (
            <FlatList
              data={users}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    {item.name || 'Nome não disponível'} - {item.phone || 'Sem telefone'}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => Alert.alert('Aviso', 'Funcionalidade de edição a ser implementada')}
                    >
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Text style={styles.buttonText}>Deletar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.noDataText}>Nenhum usuário cadastrado.</Text>}
            />
          )}
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
    backgroundColor: 'rgba(209, 231, 221, 0.8)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
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
    backgroundColor: '#166534',
    position: 'absolute',
    top: 180,
    right: 20,
    width: 200,
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
    elevation: 10,
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
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E3A8A',
  },
  itemText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#166534',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 14,
  },
  loadingText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    textAlign: 'center',
    padding: 10,
  },
  errorText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    padding: 10,
  },
  noDataText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    textAlign: 'center',
    padding: 10,
  },
});