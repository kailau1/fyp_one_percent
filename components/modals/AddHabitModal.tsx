import React, { useState } from 'react';
import { Modal, StyleSheet, ScrollView, TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import InputField from '@/components/InputField';
import Header from '@/components/Header-Sub';
import ButtonCTA from '@/components/ui/ButtonCTA';
import { useUser } from '@/context/UserContext';
import { useHabits } from '@/context/HabitsContext';
import { createHabit } from '@/scripts/services/habitService';

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddHabitModal({ visible, onClose }: AddHabitModalProps) {
  const { user } = useUser();
  const { habits, setHabits } = useHabits();
  const colourScheme = useColorScheme();
  const iconColour = colourScheme === 'dark' ? '#fff' : '#000';
  const colourCodes: string[] = [
    "#A7C7E7",
    "#B4E197",
    "#F8C8DC",
    "#D6A4E7",
    "#FDFD96",
    "#FFD1A9",
    "#AAF0D1",
    "#E3D4FC",
    "#FCA3B7",
    "#AEEDEE",
  ];

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
        onClose();
      }
    } else if (habitType === 'trigger-action') {
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
        onClose();
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContainer}>
          <Header title="New Habit" onBackPress={onClose} iconColour={iconColour} />
          <ScrollView contentContainerStyle={styles.content}>
            <ThemedText style={styles.subHeader}>Type of Habit</ThemedText>
            <View style={styles.habitTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButtonContainer,
                  habitType === 'trigger-action' && styles.activeType,
                ]}
                onPress={() => setHabitType('trigger-action')}
              >
                <ThemedText style={styles.typeButtonText}>Trigger/Action</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButtonContainer,
                  habitType === 'standard' && styles.activeType,
                ]}
                onPress={() => setHabitType('standard')}
              >
                <ThemedText style={styles.typeButtonText}>Standard</ThemedText>
              </TouchableOpacity>
            </View>
  
            {habitType === 'standard' ? (
              <>
                <ThemedText style={styles.subHeader}>Habit Name</ThemedText>
                <InputField
                  placeholder="Enter habit name"
                  value={habitName}
                  onChangeText={setHabitName}
                />
                <ThemedText style={styles.subHeader}>Habit Description</ThemedText>
                <InputField
                  placeholder="Enter description"
                  value={habitDescription}
                  onChangeText={setHabitDescription}
                />
              </>
            ) : (
              <>
                <ThemedText style={styles.subHeader}>When I,</ThemedText>
                <InputField
                  placeholder="Trigger"
                  value={trigger}
                  onChangeText={setTrigger}
                />
                <ThemedText style={styles.subHeader}>I will,</ThemedText>
                <InputField
                  placeholder="Action"
                  value={action}
                  onChangeText={setAction}
                />
              </>
            )}
  
            <ThemedText style={styles.subHeader}>Select Colour</ThemedText>
            <ScrollView style={styles.colours} horizontal>
              {colourCodes.map((colour) => (
                <TouchableOpacity
                  key={colour}
                  style={[
                    styles.colourCircle,
                    {
                      backgroundColor: colour,
                      borderWidth: selectedColor === colour ? 2 : 0,
                      borderColor: '#000',
                    },
                  ]}
                  onPress={() => setSelectedColor(colour)}
                />
              ))}
            </ScrollView>
            <ButtonCTA title="Create New Habit" onPress={handleCreateHabit} />
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: '1%',
    marginTop: '5%',
    fontFamily: 'Comfortaa_400Regular',
  },
  habitTypeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  typeButtonContainer: {
    flex: 0.48,
    backgroundColor: '#E4EAF2',
    borderRadius: 40,
    alignItems: 'center',
    padding: 10,
  },
  activeType: {
    backgroundColor: '#C8E1FF',
    borderWidth: 2,
    borderColor: '#4B9CD3',
  },
  typeButtonText: {
    fontSize: 16,
    fontFamily: 'Comfortaa_400Regular',
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
});