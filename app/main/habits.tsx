import { ScrollView, Switch, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BottomNav from '@/components/ui/BottomNav';
import {completeHabit, uncompleteHabit } from '@/scripts/services/habitService';
import { ProgressBar } from 'react-native-paper';
import { useUser } from '@/context/UserContext';
import { useHabits } from '@/context/HabitsContext';
import { useRouter } from 'expo-router';

export default function HabitsScreen() {
  const { user } = useUser();
  const router = useRouter();
  const { habits, setHabits } = useHabits();
  
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

  const completedCount = habits ? habits.filter((habit) => habit.completed).length : 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Your Habits</ThemedText>
        <ThemedText style={styles.addButton} onPress={() => router.push('./addHabits')}>+</ThemedText>
      </ThemedView>
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
      <ScrollView contentContainerStyle={styles.habitsList}>
        {habits.map((habit) => (
          <ThemedView
            key={habit.id}
            style={[styles.habitContainer, { backgroundColor: habit.colour}]}
          >
            <ThemedText style={styles.habitText}>{habit.habitName}</ThemedText>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#81C784' }}
              thumbColor={habit.completed ? '#4CAF50' : '#FFF'}
              value={habit.completed}
              onValueChange={() => handleToggle(habit.id, habit.completed)}
            />
          </ThemedView>
        ))}
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
