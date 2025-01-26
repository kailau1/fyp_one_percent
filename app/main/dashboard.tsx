import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNav from '@/components/ui/BottomNav';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Divider from '@/components/ui/Divider';
import { useState} from 'react';
import { useUser} from '@/context/UserContext';
import { useLocalSearchParams } from 'expo-router';

export default function DashboardScreen() {
  const [habits, setHabits] = useState([
      { id: 1, title: 'Drink Water'},
      { id: 2, title: 'Morning Workout'},
      { id: 3, title: 'Read for 30 minutes'},
    ]);
  const { user } = useUser();
  const { fresh } = useLocalSearchParams();
  const welcomeTitle = fresh === 'true' ? 'Welcome,' : 'Welcome back,';


  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeText}>{welcomeTitle}</ThemedText>
      <ThemedText style={styles.nameText}>{user?.firstName}</ThemedText>
      <Divider />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Tip of the Day */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Tip of the Day</ThemedText>
          <ThemedText style={styles.tipText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet ornare metus.
          </ThemedText>
        </ThemedView>
        {/* Journal Options */}
        <ThemedView style={[styles.card]}>
          <ThemedText style={styles.cardTitle}>
            How do you want to journal today?
          </ThemedText>
          <ThemedView style={styles.journalOptions}>
            <TouchableOpacity style={[styles.optionButton, styles.unguided]}>
              <ThemedText style={styles.optionText}>Blank Page</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, styles.guided]}>
              <ThemedText style={styles.optionText}>Write with Prompts</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        {/* Habits Section */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Habits</ThemedText>
          {habits.map((habit) => (
              <ThemedText>{habit.title}</ThemedText>
          ))}
          <ThemedText style={styles.addButtonText}>+</ThemedText>
        </ThemedView>

        {/* Progress Overview */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Progress Overview</ThemedText>
          <ThemedView style={styles.progressContainer}>
            <ThemedText style={styles.progressText}>Today's Progress</ThemedText>
            <ThemedText style={styles.progressPercentage}>75%</ThemedText>
          </ThemedView>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60,
    marginBottom: '2%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '10%',
    fontFamily: 'Comfortaa_400Regular',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: '1%',
    fontFamily: 'Comfortaa_400Regular',
  },
  card: {
    backgroundColor: '#E4EAF2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin: 20,
    borderWidth: 1,
    borderColor: '#878787',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Comfortaa_400Regular',
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Comfortaa_400Regular',
  },
  tipText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Comfortaa_400Regular',
    textAlign: 'center',
  },
  addButtonText: {
    fontSize: 40,
    fontWeight: '600',
    position: 'absolute',
    right: 20,
    bottom: 20,
    color: '#74B7E2',
  },
  progressContainer: {
    marginTop: 10,
    backgroundColor: '#E4EAF2',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: '500',
    color: '#4CAF50',
    fontFamily: 'Comfortaa_400Regular',
    padding: 2,
  },
  journalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#E4EAF2',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  unguided: {
    backgroundColor: '#D6ECF3',
  },
  guided: {
    backgroundColor: '#DFF4E3',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    textAlign: 'center',
  },
});
