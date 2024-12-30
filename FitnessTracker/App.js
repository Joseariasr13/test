import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const USER_ID_KEY = 'user_id';

export default function App() {
  useEffect(() => {
    const initializeUserId = async () => {
      try {
        let userId = await SecureStore.getItemAsync(USER_ID_KEY);
        if (!userId) {
          userId = generateUUID();
          await SecureStore.setItemAsync(USER_ID_KEY, userId);
          console.log("Nuevo userId generado y guardado:", userId);
        } else {
          console.log("userId existente:", userId);
        }
      } catch (error) {
        console.error("Error al manejar el userId:", error);
      }
    };

    initializeUserId();
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});