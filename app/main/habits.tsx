import { ScrollView, Switch, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Overlay } from 'react-native-elements';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BottomNav from '@/components/ui/BottomNav';
import { completeHabit, uncompleteHabit, updateHabit } from '@/scripts/services/habitService';
import { ProgressBar } from 'react-native-paper';
import { useUser } from '@/context/UserContext';
import { useHabits } from '@/context/HabitsContext';
import { useRouter } from 'expo-router';
import Divider from '@/components/ui/Divider';
import ButtonCTA from '@/components/ui/ButtonCTA';
import ScrollViewHabitColourCodes from '@/components/HabitColourCodes';

export default function HabitsScreen() {
  const { user } = useUser();
  const router = useRouter();
  const { habits, setHabits } = useHabits();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [selectedColour, setSelectedColour] = useState<string>('');

  interface Habit {
    id: string;
    habitName: string;
    description: string;
    colour: string;
    completed: boolean;
  }
  
  const handleUpdateHabit = async () => {
    if (selectedHabit) {
      const updatedHabit = { ...selectedHabit, colour: selectedColour };
      await updateHabit(updatedHabit);
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === selectedHabit.id ? updatedHabit : habit
        )
      );
    }
    toggleOverlay();
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );

    if (completed) {
      await uncompleteHabit(id);
    } else {
      await completeHabit(id);
    }
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const openHabitOverlay = (habit: Habit) => {
    setSelectedHabit(habit);
    setSelectedColour(habit.colour);
    toggleOverlay();
  };

  const handleHabitDescriptionChange = (text: string) => {
    if (selectedHabit) {
      setSelectedHabit({ ...selectedHabit, description: text });
    }
  };

  const handleHabitNameChange = (text: string) => {
    if (selectedHabit) {
      setSelectedHabit({ ...selectedHabit, habitName: text });
    }
  };

  const completedCount = habits ? habits.filter((habit) => habit.completed).length : 0;

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Your Habits</ThemedText>
        <ThemedText style={styles.addButton} onPress={() => router.push('./addHabits')}>
          +
        </ThemedText>
      </ThemedView>
      <Divider />

      {/* Progress Section */}
      <ThemedView style={styles.progressContainer}>
        <ThemedText style={styles.progressText}>
          {completedCount} of {habits.length} completed!
        </ThemedText>
        <ProgressBar
          progress={completedCount / habits.length}
          color="#4CAF50"
          style={styles.progressBar}
        />
      </ThemedView>

      {/* Habit List */}
      <ScrollView contentContainerStyle={styles.habitsList}>
        {habits.map((habit) => (
          <TouchableOpacity
            key={habit.id}
            style={[styles.habitContainer, { backgroundColor: habit.colour }]}
            onPress={() => openHabitOverlay(habit)}
          >
            <ThemedText style={styles.habitText}>{habit.habitName}</ThemedText>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#81C784' }}
              thumbColor={habit.completed ? '#4CAF50' : '#FFF'}
              value={habit.completed}
              onValueChange={() => handleToggle(habit.id, habit.completed)}
            />
          </TouchableOpacity>
        ))}

        {/* Completed Today Section */}
        <ThemedView style={styles.completedToday}>
          <ThemedText style={styles.completedText}>Completed Today</ThemedText>
          {habits
            .filter((habit) => habit.completed)
            .map((habit) => (
              <ThemedView
                key={habit.id}
                style={[styles.habitContainer, { backgroundColor: habit.colour }]}
              >
                <ThemedText style={styles.habitText}>{habit.habitName}</ThemedText>
              </ThemedView>
            ))}
        </ThemedView>
      </ScrollView>

      {/* Habit Detail Overlay */}
      <Overlay 
        isVisible={overlayVisible} 
        onBackdropPress={toggleOverlay} 
        overlayStyle={[styles.overlay]}
      >
        <ThemedView style={[styles.overlayContainer]}>
          <ThemedText style={styles.overlayLabels}>Name</ThemedText>
          <TextInput 
            style={styles.overlayInput}
            value={selectedHabit?.habitName || ''}
            onChangeText={handleHabitNameChange}
          />

          <ThemedText style={styles.overlayLabels}>Description</ThemedText>  
          <TextInput 
            style={styles.overlayDescriptionInput}
            multiline={true}
            value={selectedHabit?.description || ''}
            onChangeText={handleHabitDescriptionChange}
          />
          <ThemedText style={styles.overlayLabels}>Colour</ThemedText>
          <ScrollViewHabitColourCodes isSmall={true} selectedColour={selectedColour} onSelectColour={setSelectedColour} />
          <ButtonCTA
            title="Close"
            onPress={handleUpdateHabit}
          />
        </ThemedView>
      </Overlay>

      {/* Bottom Navigation */}
      <BottomNav />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F7F9FC',
    position: 'relative',
    marginTop: '10%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 35,
    color: '#74B7E2',
    fontSize: 45,
    fontFamily: 'Comfortaa_400Regular',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Comfortaa_400Regular',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  habitsList: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: '20%',
  },
  habitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  habitText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
  },
  completedToday: {
    marginTop: 20,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F7F9FC',
    borderRadius: 10,
    width: '100%',
  },
  completedText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    marginBottom: 10,
  },
  overlay: {
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  overlayContainer: {
    borderRadius: 15,
    padding: 20,
  },
  overlayLabels: {
    fontSize: 16,
    fontWeight: '600',
  },
  overlayInput: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    outlineWidth: 0,
  },
  overlayDescriptionInput: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
    outlineWidth: 0,
  },
});