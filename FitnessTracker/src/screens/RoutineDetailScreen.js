import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc, doc, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'user_id';

const RoutineDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [routineName, setRoutineName] = useState('');
    const [availableExercises, setAvailableExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserId = async () => {
            try {
                let storedUserId = await SecureStore.getItemAsync(USER_ID_KEY);
                if (!storedUserId) {
                    storedUserId = uuidv4();
                    await SecureStore.setItemAsync(USER_ID_KEY, storedUserId);
                    console.log("Nuevo userId generado y guardado:", storedUserId);
                } else {
                    console.log("userId existente:", storedUserId);
                }
                setUserId(storedUserId);
            } catch (error) {
                console.error("Error al manejar el userId:", error);
            }
        };

        getUserId();
    }, []);

    useEffect(() => {
        if (route.params?.selectedExercises) {
            setSelectedExercises(route.params.selectedExercises);
        }
    }, [route.params?.selectedExercises]);

    useEffect(() => {
        const fetchExercises = async () => {
            const q = collection(db, 'exercises');
            const querySnapshot = await getDocs(q);
            const exercisesData = [];
            querySnapshot.forEach((doc) => {
                exercisesData.push({ id: doc.id, ...doc.data() });
            });
            setAvailableExercises(exercisesData);
        };

        fetchExercises();
    }, []);

    useEffect(() => {
        if (route.params?.routine) {
            const { routine } = route.params;
            setRoutineName(routine.name);
            setSelectedExercises(routine.exercises || []);
        }
    }, [route.params?.routine]);

    const handleRoutineNameChange = (text) => {
        setRoutineName(text);
    };

    const handleAddExercise = (exercise) => {
        setSelectedExercises(prevExercises => [...prevExercises, exercise]);
        setAvailableExercises(prevExercises => prevExercises.filter(ex => ex.id !== exercise.id));
    };

    const handleSaveRoutine = async () => {
        if (!userId) {
            console.error("userId no está disponible.");
            return;
        }
        try {
            const routineData = {
                name: routineName,
                userId: userId,
                createdAt: new Date(),
            };

            if (route.params?.routineId) {
                const routineRef = doc(db, "routines", route.params.routineId);
                await updateDoc(routineRef, routineData);
                console.log("Routine updated!");
            } else {
                const docRef = await addDoc(collection(db, "routines"), routineData);
                console.log("Routine created with ID: ", docRef.id);
                const routineRef = doc(db, "routines", docRef.id);
                await updateDoc(routineRef, {
                    exercises: arrayUnion(...selectedExercises.map(exercise => ({
                        id: exercise.id,
                        name: exercise.name,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        weight: exercise.weight,
                    }))),
                });
                console.log("Exercises added to routine!");
            }

            navigation.navigate('Routines');
        } catch (error) {
            console.error("Error saving routine: ", error);
        }
    };

    const handleRemoveExercise = (exercise) => {
        setAvailableExercises(prevExercises => [...prevExercises, exercise]);
        setSelectedExercises(prevExercises => prevExercises.filter(ex => ex.id !== exercise.id));
    };

    const selectedExercisesItem = ({ item }) => {
        return (
            <View style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleRemoveExercise(item)}>
                    <Text style={styles.deleteButton}>-</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const availableExercisesItem = ({ item }) => {
        return (
            <View style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleAddExercise(item)}>
                    <Text style={styles.addButton}>+</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.label}>Nombre de la Rutina:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre de la rutina"
                    value={routineName}
                    onChangeText={handleRoutineNameChange}
                />

                <Text style={styles.label}>Ejercicios Seleccionados:</Text>
                <FlatList
                    data={selectedExercises}
                    renderItem={selectedExercisesItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text>No hay ejercicios seleccionados</Text>}
                />

                <Text style={styles.label}>Ejercicios Disponibles:</Text>
                <FlatList
                    data={availableExercises}
                    renderItem={availableExercisesItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text>No hay ejercicios disponibles</Text>}
                />
                <Button title="Guardar Rutina" onPress={handleSaveRoutine} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    exerciseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    exerciseName: {
        fontSize: 16,
    },
    addButton: {
        fontSize: 20,
        color: 'blue',
        paddingHorizontal: 10,
    },
    deleteButton: {
        fontSize: 20,
        color: 'red',
        paddingHorizontal: 10,
    },
});

export default RoutineDetailScreen;