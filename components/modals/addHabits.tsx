import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import InputField from '../InputField';
import { useUser } from '../../context/UserContext';
import Header from '../Header-Sub';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import ButtonCTA from '../ui/ButtonCTA';
import { useHabits } from '../../context/HabitsContext';
import { createHabit } from '../../scripts/services/habitService';

export default function AddHabitsScreen() {
  const { user } = useUser();
  const { habits, setHabits } = useHabits();
  const router = useRouter();
  const colourScheme = useColorScheme();
  const iconColour = colourScheme === 'dark' ? '#fff' : '#000';
  const colourCodes: string[] = ["#A7C7E7", "#B4E197", "#F8C8DC", "#D6A4E7", "#FDFD96", "#FFD1A9", "#AAF0D1", "#E3D4FC", "#FCA3B7", "#AEEDEE"];

  const [habitType, setHabitType] = useState<'standard' | 'trigger-action'>('standard');
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [trigger, setTrigger] = useState('');
  const [action, setAction] = useState('');
  const [selectedColor, setSelectedColor] = useState(colourCodes[0]);

  const handleCreateHabit = async () => {
    if (!user || !user.id) {
      console.log('User not logged in');
      return;
    }
  
    if (!habitType) {
      console.log('Please select a habit type');
      return;
    }
  
    if (habitType === 'standard') {
      if (!habitName || !habitDescription) {
        console.log('Please fill in all fields for a standard habit');
        return;
      }
  
      const newHabit = await createHabit(
        user.id,
        habitName,
        habitDescription,
        false,
        selectedColor,
        user.token,
        habitType
      );
      
      if (newHabit) {
        setHabits([...habits, newHabit]);
        router.back();
      }
    }
  
    if (habitType === 'trigger-action') {
      if (!trigger || !action) {
        console.log('Please fill in both trigger and action for a trigger-action habit');
        return;
      }
    
      const newHabit = await createHabit(
        user.id,
        '', 
        '', 
        false,
        selectedColor,
        user.token,
        habitType,
        trigger,
        action
      );
    
      if (newHabit) {
        setHabits([...habits, newHabit]);
        router.back();
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header title="New Habit" onBackPress={() => router.back()} iconColour={iconColour} />
      <ThemedView style={styles.addHabitContainer}>
        <ThemedText style={styles.subHeader}>Type of Habit</ThemedText>
        <View style={styles.habitTypeContainer}>
          <TouchableOpacity
            style={[styles.typeButtonContainer, habitType === 'trigger-action' && styles.activeType]}
            onPress={() => setHabitType('trigger-action')}
          >
            <Text style={styles.typeButtonText}>Trigger/Action</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButtonContainer, habitType === 'standard' && styles.activeType]}
            onPress={() => setHabitType('standard')}
          >
            <Text style={styles.typeButtonText}>Standard</Text>
          </TouchableOpacity>
        </View>

        {/* 🆕 Conditional Inputs */}
        {habitType === 'standard' ? (
          <>
            <ThemedText style={styles.subHeader}>Habit Name</ThemedText>
            <InputField placeholder="Enter habit name" value={habitName} onChangeText={setHabitName} />
            <ThemedText style={styles.subHeader}>Habit Description</ThemedText>
            <InputField placeholder="Enter description" value={habitDescription} onChangeText={setHabitDescription} />
          </>
        ) : (
          <>
            <ThemedText style={styles.subHeader}>When I,</ThemedText>
            <InputField placeholder="Trigger" value={trigger} onChangeText={setTrigger} />
            <ThemedText style={styles.subHeader}>I will,</ThemedText>
            <InputField placeholder="Action" value={action} onChangeText={setAction} />
          </>
        )}

        <ThemedText style={styles.subHeader}>Select Colour</ThemedText>
        <ScrollView style={styles.colours} horizontal>
          {colourCodes.map((colour) => (
            <TouchableOpacity
              key={colour}
              style={[styles.colourCircle, { backgroundColor: colour, borderWidth: selectedColor === colour ? 2 : 0, borderColor: '#000' }]}
              onPress={() => setSelectedColor(colour)}
            />
          ))}
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <ButtonCTA title='Create New Habit' onPress={handleCreateHabit} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  addHabitContainer: { padding: 20 },
  subHeader: { fontSize: 18, marginBottom: '1%', marginTop: '5%', fontFamily: 'Comfortaa_400Regular' },
  habitTypeContainer: { flexDirection: 'row', marginBottom: 10 },
  typeButtonContainer: {
    margin: '1%',
    backgroundColor: '#E4EAF2',
    borderRadius: 40,
    alignContent: 'center',
    width: '40%',
    alignItems: 'center',
  },
  activeType: {
    backgroundColor: '#C8E1FF',
    borderWidth: 2,
    borderColor: '#4B9CD3',
  },
  typeButtonText: {
    fontSize: 16,
    fontFamily: 'Comfortaa_400Regular',
    padding: 6,
  },
  colours: {
    flexDirection: 'row',
    height: 70,
    marginBottom: 20,
  },
  colourCircle: {
    borderRadius: 30,
    height: 60,
    width: 60,
    margin: '1%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '20%',
    width: '60%',
  },
});
