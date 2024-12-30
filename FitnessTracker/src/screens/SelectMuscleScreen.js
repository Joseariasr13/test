import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

const muscleGroups = [
  { id: 1, name: 'Pecho', emoji: '💪' },
  { id: 2, name: 'Espalda', emoji: '🔙' },
  { id: 3, name: 'Hombros', emoji: '🎯' },
  { id: 4, name: 'Bíceps', emoji: '💪' },
  { id: 5, name: 'Tríceps', emoji: '💪' },
  { id: 6, name: 'Abdominales', emoji: '🎯' },
  { id: 7, name: 'Cuádriceps', emoji: '🦵' },
  { id: 8, name: 'Isquiotibiales', emoji: '🦵' },
  { id: 9, name: 'Glúteos', emoji: '🍑' },
  { id: 10, name: 'Gemelos', emoji: '🦵' },
];

const SelectMuscleScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {muscleGroups.map((muscle) => (
          <TouchableOpacity
  key={muscle.id}
  style={styles.card}
  onPress={() => navigation.navigate('Exercises', { muscle: muscle.name })}
>
  <Text style={styles.emoji}>{muscle.emoji}</Text>
  <Text style={styles.muscleName}>{muscle.name}</Text>
</TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  muscleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SelectMuscleScreen;