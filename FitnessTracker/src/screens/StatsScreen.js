import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsScreen = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const savedExercises = await AsyncStorage.getItem('exercises');
      if (savedExercises) {
        const exercisesData = JSON.parse(savedExercises);
        setExercises(exercisesData);
        
        // Obtener ejercicios únicos
        const uniqueExercises = [...new Set(exercisesData.map(e => e.exerciseName))];
        if (uniqueExercises.length > 0) {
          setSelectedExercise(uniqueExercises[0]);
          generateChartData(exercisesData, uniqueExercises[0]);
        }
      }
    } catch (error) {
      console.error('Error al cargar ejercicios:', error);
    }
  };

  const generateChartData = (exercisesData, exerciseName) => {
    const exerciseHistory = exercisesData
      .filter(e => e.exerciseName === exerciseName)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const maxWeights = exerciseHistory.map(exercise => {
      const maxWeight = Math.max(...exercise.sets.map(set => parseFloat(set.weight) || 0));
      return maxWeight;
    });

    const dates = exerciseHistory.map(exercise => 
      new Date(exercise.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
    );

    setChartData({
      labels: dates,
      datasets: [{
        data: maxWeights,
      }]
    });
  };

  const getExerciseStats = (exerciseName) => {
    const exerciseData = exercises.filter(e => e.exerciseName === exerciseName);
    const maxWeight = Math.max(
      ...exerciseData.flatMap(e => e.sets.map(s => parseFloat(s.weight) || 0))
    );
    const totalSets = exerciseData.reduce((acc, e) => acc + e.sets.length, 0);
    const averageWeight = (
      exerciseData.flatMap(e => e.sets.map(s => parseFloat(s.weight) || 0))
        .reduce((acc, weight) => acc + weight, 0) / totalSets
    ).toFixed(1);

    return { maxWeight, totalSets, averageWeight };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estadísticas de Progreso</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseSelector}>
        {[...new Set(exercises.map(e => e.exerciseName))].map((exerciseName) => (
          <TouchableOpacity
            key={exerciseName}
            style={[
              styles.exerciseButton,
              selectedExercise === exerciseName && styles.exerciseButtonSelected
            ]}
            onPress={() => {
              setSelectedExercise(exerciseName);
              generateChartData(exercises, exerciseName);
            }}
          >
            <Text style={[
              styles.exerciseButtonText,
              selectedExercise === exerciseName && styles.exerciseButtonTextSelected
            ]}>
              {exerciseName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedExercise && chartData && (
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            {Object.entries(getExerciseStats(selectedExercise)).map(([key, value]) => (
              <View key={key} style={styles.statItem}>
                <Text style={styles.statLabel}>
                  {key === 'maxWeight' ? 'Peso Máximo' :
                   key === 'totalSets' ? 'Series Totales' :
                   'Peso Promedio'}
                </Text>
                <Text style={styles.statValue}>
                  {key.includes('Weight') ? `${value} kg` : value}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.chartTitle}>Progreso de Peso Máximo</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 30}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#2196F3',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}
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
  exerciseSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  exerciseButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  exerciseButtonSelected: {
    backgroundColor: '#2196F3',
  },
  exerciseButtonText: {
    color: '#333',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  exerciseButtonTextSelected: {
    color: '#fff',
  },
  statsContainer: {
    marginTop: 10,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default StatsScreen;