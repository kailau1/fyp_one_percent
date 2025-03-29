import React from 'react';
import {
    Modal,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ButtonCTA from '@/components/ui/ButtonCTA';
import InputField from '@/components/InputField';

interface HabitModalProps {
  visible: boolean;
  onClose: () => void;
  habit?: {
    habitName?: string;
    description?: string;
    trigger?: string;
    action?: string;
    habitType: 'standard' | 'trigger-action';
  };
  trigger: string;
  action: string;
  selectedColour: string;
  colourCodes: string[];
  setSelectedColour: (colour: string) => void;
  setTrigger: (trigger: string) => void;
  setAction: (action: string) => void;
  handleHabitNameChange: (text: string) => void;
  handleHabitDescriptionChange: (text: string) => void;
  handleUpdateHabit: () => void;
  handleDeleteHabit: () => void;
}

export default function HabitModal({
  visible,
  onClose,
  habit,
  trigger,
  action,
  selectedColour,
  colourCodes,
  setSelectedColour,
  setTrigger,
  setAction,
  handleHabitNameChange,
  handleHabitDescriptionChange,
  handleUpdateHabit,
  handleDeleteHabit,
}: HabitModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ThemedView style={styles.modalOverlay}>
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.overlayHeader}>
            <ThemedText style={styles.overlayHeaderText}>Edit Habit</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={[styles.overlayHeaderText, { color: '#007AFF' }]}>Close</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          <ThemedView style={styles.habitInputContainer}>
            {habit?.habitType === 'trigger-action' ? (
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
            ) : (
              <>
                <ThemedText style={styles.subHeader}>Habit Name</ThemedText>
                <InputField
                  placeholder="Enter habit name"
                  value={habit?.habitName || ''}
                  onChangeText={handleHabitNameChange}
                />
                <ThemedText style={styles.subHeader}>Habit Description</ThemedText>
                <InputField
                  placeholder="Enter description"
                  value={habit?.description || ''}
                  onChangeText={handleHabitDescriptionChange}
                />
              </>
            )}
            <ThemedText style={styles.subHeader}>Label Colour</ThemedText>
            <ScrollView style={styles.colours} horizontal={true}>
              {colourCodes.map((colour) => (
                <TouchableOpacity
                  key={colour}
                  style={[
                    styles.colourCircle,
                    {
                      backgroundColor: colour,
                      borderWidth: selectedColour === colour ? 2 : 0,
                      borderColor: '#000',
                    },
                  ]}
                  onPress={() => setSelectedColour(colour)}
                />
              ))}
            </ScrollView>
            <ButtonCTA title="Save" onPress={handleUpdateHabit} />
            <ButtonCTA title="Delete Habit" onPress={handleDeleteHabit} style={{ backgroundColor: '#F25C69' }} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  overlayHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Comfortaa_700Bold',
  },
  habitInputContainer: {
    marginTop: '5%',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: '1%',
    marginTop: '5%',
    fontFamily: 'Comfortaa_700Bold',
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