import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';

const USER_ID_KEY = 'user_id';

const RoutinesScreen = () => {
    const navigation = useNavigation();
    const [routines, setRoutines] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const storedUserId = await SecureStore.getItemAsync(USER_ID_KEY);
                if (storedUserId) {
                    setUserId(storedUserId);
                } else {
                    console.error("No se encontró el userId en SecureStore.");
                }
            } catch (error) {
                console.error("Error al obtener el userId de SecureStore:", error);
            }
        };

        getUserId();
    }, []);

    useEffect(() => {
        const loadRoutines = () => {
            if (!userId) {
                console.warn("userId no está disponible. No se cargarán las rutinas.");
                return;
            }
            const q = query(collection(db, "routines"), where("userId", "==", userId));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const routinesData = [];
                querySnapshot.forEach((doc) => {
                    routinesData.push({ id: doc.id, ...doc.data() });
                });
                setRoutines(routinesData);
            });

            return () => unsubscribe();
        };

        loadRoutines();
    }, [userId]);

    const handleRoutinePress = (routine) => {
        navigation.navigate('RoutineDetail', { routineId: routine.id, routine: routine });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={routines}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleRoutinePress(item)}>
                        <View style={styles.routineItem}>
                            <Text style={styles.routineName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    routineItem: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
    },
    routineName: {
        fontSize: 18,
    },
});

export default RoutinesScreen;