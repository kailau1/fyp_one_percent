import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import InputField from '@/components/InputField';
import { useUser } from '@/context/UserContext';
import Header from '@/components/Header-Sub';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import ButtonCTA from '@/components/ui/ButtonCTA';
import { useHabits } from '@/context/HabitsContext';
import { createHabit } from '@/scripts/services/habitService';

export default function AddHabitsScreen() {
  const { user } = useUser();
  const { habits, setHabits } = useHabits();
  const router = useRouter();
  const colourScheme = useColorScheme();
  const iconColour = colourScheme === 'dark' ? '#fff' : '#000';
  let colourCodes: Array<string> = ["#A7C7E7", "#B4E197", "#F8C8DC", "#D6A4E7", "#FDFD96", "#FFD1A9", "#AAF0D1", "#E3D4FC", "#FCA3B7", "#AEEDEE"]

  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colourCodes[0]);

  const handleCreateHabit = async () => {
    if (user?.id && habitName && habitDescription) {
      const newHabit = await createHabit(user.id, habitName, habitDescription, false, selectedColor);
      if (newHabit) {
        setHabits([...habits, newHabit]);
        router.back();
      } else {
        console.log('Failed to create habit');
      }
    } else {
      console.log('Please fill in all fields');
    }
  };

  const styles = StyleSheet.create({ 
    container: {
      flex: 1,
    },
    addHabitContainer: {
      padding: 20,
      flexDirection: 'column',
    },
    subHeader: {
      fontSize: 18,
      marginBottom: '1%',
      marginTop: '5%',
      fontFamily: 'Comfortaa_400Regular',
    },
    habitTypeContainer: {
      flexDirection: 'row',
    },
    typeButtonContainer: {
      margin: '1%',
      backgroundColor: '#E4EAF2',
      borderRadius: 40,
      alignContent: 'center',
      width: '40%',
      alignItems: 'center',
    },
    typeButtonText: {
      fontSize: 16,
      fontFamily: 'Comfortaa_400Regular',
      padding: 6,
    },
    habitInputContainer: {
      marginTop: '5%',
    },
    colours: {
      flex: 1,
      flexDirection: 'row',
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
      left: 0,
      right: 0,
      marginHorizontal: 'auto',
      width: '60%',
    },
  });

  return (
    <ThemedView style={styles.container}>
      <Header title="New Habit" onBackPress={() => router.back()} iconColour={iconColour} />
      <ThemedView style={styles.addHabitContainer}>
        <ThemedText style={styles.subHeader}>Type of Habit</ThemedText>
        <ThemedView style={styles.habitTypeContainer}>
          <TouchableOpacity style={styles.typeButtonContainer}>
            <Text style={styles.typeButtonText}>
              Cue / Action
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeButtonContainer}>
            <Text style={styles.typeButtonText}>
              Standard
            </Text>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.habitInputContainer}>
          <ThemedText style={styles.subHeader}>Habit Name</ThemedText>
          <InputField placeholder="Enter habit name" value={habitName} onChangeText={setHabitName} />
          <ThemedText style={styles.subHeader}>Habit Description</ThemedText>
          <InputField placeholder="Enter description" value={habitDescription} onChangeText={setHabitDescription} />
        </ThemedView>
        <ThemedText style={styles.subHeader}>Label Colour</ThemedText> 
        <ScrollView style={styles.colours} horizontal={true}>
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