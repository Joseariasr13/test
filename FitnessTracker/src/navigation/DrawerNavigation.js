import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import RoutinesScreen from '../screens/RoutinesScreen';
import MuscleSelectorScreen from '../screens/MuscleSelectorScreen';
import StatsScreen from '../screens/StatsScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Exercises" component={ExercisesScreen} />
      <Drawer.Screen name="Routines" component={RoutinesScreen} />
      <Drawer.Screen name="MuscleSelector" component={MuscleSelectorScreen} />
      <Drawer.Screen name="Stats" component={StatsScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;