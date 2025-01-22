import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import BottomNav from '@/components/ui/BottomNav';

export default function HabitsScreen() {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Drink Water', completed: false, color: '#FFCDD2' },
    { id: 2, title: 'Morning Workout', completed: false, color: '#C5CAE9' },
    { id: 3, title: 'Read for 30 minutes', completed: false, color: '#C8E6C9' },
  ]);

  const handleToggle = (id: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const completedCount = habits.filter((habit) => habit.completed).length;

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Your Habits</ThemedText>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#74B7E2" />
        </TouchableOpacity>
      </ThemedView>
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
      {/* Habits List and Completed Today */}
      <ScrollView contentContainerStyle={styles.habitsList}>
        {/* Habits List */}
        {habits.map((habit) => (
          <ThemedView
            key={habit.id}
            style={[styles.habitContainer, { backgroundColor: habit.color }]}
          >
            <ThemedText style={styles.habitText}>{habit.title}</ThemedText>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#81C784' }}
              thumbColor={habit.completed ? '#4CAF50' : '#FFF'}
              value={habit.completed}
              onValueChange={() => handleToggle(habit.id)}
            />
          </ThemedView>
        ))}

        {/* Completed Today Section */}
        <ThemedView style={styles.completedToday}>
          <ThemedText style={styles.completedText}>Completed Today</ThemedText>
          {habits
            .filter((habit) => habit.completed)
            .map((habit) => (
              <ThemedView
                key={habit.id}
                style={[styles.habitContainer, { backgroundColor: habit.color }]}
              >
                <ThemedText style={styles.habitText}>{habit.title}</ThemedText>
              </ThemedView>
            ))}
        </ThemedView>
      </ScrollView>
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
    right: 20,
    backgroundColor: '#E0F7FA',
    borderRadius: 50,
    padding: 8,
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
});
