import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; // Importa AppLoading para controle de carregamento
import RegisterScreen from './screens/RegisterScreen';
import UserListScreen from './screens/UserListScreen';
import FrequencyScreen from './screens/FrequencyScreen';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('./assets/background.jpg')} // Substitua pelo caminho da sua imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Logo no lugar de "Na Trilha do Dev" */}
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')} // Substitua pelo caminho da sua logo
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Título "Cadastro Sopão" (comentado, mas mantido para referência) */}
        {/*<Text style={styles.title}>Cadastro Sopão</Text>*/}

        {/* Botões */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Cadastrar Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('List')}
        >
          <Text style={styles.buttonText}>Listar Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Frequency')}
        >
          <Text style={styles.buttonText}>Frequência de Usuários</Text>
        </TouchableOpacity>

        {/* Rodapé */}
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>Desenvolvido por Rafael</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
        'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'), // Carrega Poppins Bold
        'PoppinsBlack': require('./assets/fonts/Poppins-Black.ttf'), // Carrega Poppins Black
      });
      console.log('Fontes Poppins carregadas com sucesso!');
    } catch (error) {
      console.log('Erro ao carregar fontes:', error);
    }
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => {
          console.log('AppLoading: Fontes finalizadas!');
          setFontLoaded(true);
        }}
        onError={(error) => console.log('AppLoading: Erro ao carregar fontes:', error)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="List" component={UserListScreen} />
        <Stack.Screen name="Frequency" component={FrequencyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(209, 231, 221, 0.8)', // Transparência para legibilidade
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 150,
  },
  title: {
    fontSize: 36,
    fontFamily: 'PoppinsBlack',
    color: '#1E3A8A',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#166534',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 18,
    letterSpacing: 1.3,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footer: {
    fontFamily: 'PoppinsBold', // Alterado para PoppinsRegular para um texto menos destacado
    fontSize: 14,
    color: '#166534', // Consistente com o design geral
    letterSpacing: 1.3,
  },
});