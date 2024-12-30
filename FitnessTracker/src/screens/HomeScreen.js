import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym Tracker</Text>
      
      {user ? (
        <>
          <Text style={styles.welcomeText}>
            Bienvenido, {user.email}
          </Text>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('SelectMuscle')}
          >
            <Text style={styles.buttonText}>Comenzar Entrenamiento</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.routinesButton]}
            onPress={() => navigation.navigate('Routines')}
          >
            <Text style={styles.buttonText}>Rutinas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.historyButton]}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.buttonText}>Ver Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.statsButton]}
            onPress={() => navigation.navigate('Stats')}
          >
            <Text style={styles.buttonText}>Estadísticas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.mapButton]}
            onPress={() => navigation.navigate('MuscleSelector')}
          >
            <Text style={styles.buttonText}>Mapa Muscular</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión / Registrarse</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2196F3',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  routinesButton: {
    backgroundColor: '#3F51B5',
  },
  historyButton: {
    backgroundColor: '#4CAF50',
  },
  statsButton: {
    backgroundColor: '#FF9800',
  },
  mapButton: {
    backgroundColor: '#9C27B0',
  },
  loginButton: {
    backgroundColor: '#2196F3',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;