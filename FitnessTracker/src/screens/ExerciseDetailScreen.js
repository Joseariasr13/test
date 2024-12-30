import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Alert,
  Modal,
  Vibration
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseDetailScreen = ({ route, navigation }) => {
  const { exercise, muscle, fromRoutine, routineData, exerciseIndex, totalExercises } = route.params;
  const [sets, setSets] = useState([]);

useEffect(() => {
  const initializeSets = () => {
    if (fromRoutine && exercise.series) {
      const initialSets = Array(exercise.series).fill().map(() => ({
        reps: '',
        weight: '',
      }));
      setSets(initialSets);
    } else {
      setSets([]);
    }
  };
  
  initializeSets();
}, []);
  const [notes, setNotes] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [defaultRestTime, setDefaultRestTime] = useState(90);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [timerModalVisible, setTimerModalVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            Vibration.vibrate([0, 500, 200, 500]);
            setTimerActive(false);
            Alert.alert('¡Tiempo!', 'El tiempo de descanso ha terminado');
            return defaultRestTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft <= 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    if (seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const addSet = () => {
    setSets([...sets, { reps: '', weight: '' }]);
  };

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const removeSet = (index) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
  };

  const startTimer = () => {
    if (timeLeft > 0) {
      setTimerActive(true);
    }
  };

  const stopTimer = () => {
    setTimerActive(false);
    setTimeLeft(defaultRestTime);
  };

  const handleSave = async () => {
    try {
      if (sets.length === 0) {
        Alert.alert('Error', 'Añade al menos una serie');
        return;
      }
  
      const incompleteSets = sets.some(set => !set.reps || !set.weight);
      if (incompleteSets) {
        Alert.alert('Error', 'Completa todas las series');
        return;
      }
  
      const exerciseData = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        muscle: muscle || exercise.muscle,
        exerciseName: exercise.name,
        sets,
        notes,
      };
  
      // Guardar en el historial general
      const savedExercises = await AsyncStorage.getItem('exercises');
      const exercises = savedExercises ? JSON.parse(savedExercises) : [];
      exercises.push(exerciseData);
      await AsyncStorage.setItem('exercises', JSON.stringify(exercises));
  
      if (fromRoutine) {
        if (exerciseIndex === totalExercises - 1) {
          // Último ejercicio de la rutina
          await AsyncStorage.removeItem('activeRoutine');
          Alert.alert('¡Felicitaciones!', 'Has completado la rutina', [
            { text: 'OK', onPress: () => navigation.navigate('Home') }
          ]);
        } else {
          // Navegar al siguiente ejercicio
          navigation.replace('ExerciseDetail', {
            exercise: routineData.exercises[exerciseIndex + 1],
            fromRoutine: true,
            routineData: routineData,
            exerciseIndex: exerciseIndex + 1,
            totalExercises: totalExercises
          });
        }
      } else {
        Alert.alert('Éxito', 'Ejercicio guardado correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'No se pudo guardar el ejercicio');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>

      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <View style={styles.timerButtonsContainer}>
          {!timerActive ? (
            <TouchableOpacity 
              style={[styles.timerButton, timeLeft <= 0 && styles.disabledButton]} 
              onPress={startTimer}
              disabled={timeLeft <= 0}
            >
              <Text style={styles.timerButtonText}>Iniciar Descanso</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.timerButton, styles.stopButton]} onPress={stopTimer}>
              <Text style={styles.timerButtonText}>Detener</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={[styles.timerButton, styles.configButton]}
            onPress={() => setTimerModalVisible(true)}
          >
            <Text style={styles.timerButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sets Section */}
      <View style={styles.setsContainer}>
        <Text style={styles.setsTitle}>Series:</Text>
        {sets.map((set, index) => (
          <View key={index} style={styles.setRow}>
            <Text style={styles.setNumber}>Serie {index + 1}</Text>
            <View style={styles.setInputsContainer}>
              <TextInput
                style={styles.input}
                placeholder="Reps"
                keyboardType="numeric"
                value={set.reps}
                onChangeText={(value) => updateSet(index, 'reps', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                keyboardType="numeric"
                value={set.weight}
                onChangeText={(value) => updateSet(index, 'weight', value)}
              />
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeSet(index)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addSet}>
          <Text style={styles.addButtonText}>+ Añadir Serie</Text>
        </TouchableOpacity>
      </View>

      {/* Notes Section */}
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Notas:</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          placeholder="Añade notas sobre el ejercicio..."
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Ejercicio</Text>
      </TouchableOpacity>

      {/* Timer Configuration Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={timerModalVisible}
        onRequestClose={() => setTimerModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurar Temporizador</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Tiempo en segundos"
              value={defaultRestTime.toString()}
              onChangeText={(value) => {
                const time = value === '' ? 0 : parseInt(value);
                setDefaultRestTime(time || 0);
                setTimeLeft(time || 0);
              }}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalClearButton]}
                onPress={() => {
                  setDefaultRestTime(0);
                  setTimeLeft(0);
                  setTimerActive(false);
                }}
              >
                <Text style={styles.modalButtonText}>Borrar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setTimerModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3',
    textAlign: 'center',
  },
  timerContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  timerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  configButton: {
    minWidth: 50,
    backgroundColor: '#757575',
  },
  timerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  setsContainer: {
    marginBottom: 20,
  },
  setsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  setNumber: {
    width: 70,
    fontSize: 16,
  },
  setInputsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    width: 80,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#f44336',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesContainer: {
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalClearButton: {
    backgroundColor: '#f44336',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseDetailScreen;