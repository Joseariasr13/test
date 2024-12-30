import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const savedExercises = await AsyncStorage.getItem('exercises');
      if (savedExercises) {
        const exercisesData = JSON.parse(savedExercises);
        setExercises(exercisesData);
      }
    } catch (error) {
      console.error('Error al cargar ejercicios:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Historial de Ejercicios</Text>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
          <Text style={styles.muscleGroup}>Grupo: {exercise.muscle}</Text>
          <Text style={styles.date}>
            Fecha: {new Date(exercise.date).toLocaleDateString()}
          </Text>
          <Text style={styles.setsTitle}>Series:</Text>
          {exercise.sets.map((set, setIndex) => (
            <Text key={setIndex} style={styles.setInfo}>
              Serie {setIndex + 1}: {set.reps} reps x {set.weight} kg
            </Text>
          ))}
          {exercise.notes && (
            <Text style={styles.notes}>Notas: {exercise.notes}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
    textAlign: 'center',
  },
  exerciseCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  muscleGroup: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  setsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  setInfo: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  notes: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default HistoryScreen;