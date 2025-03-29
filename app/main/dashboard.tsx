import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNav from '@/components/ui/BottomNav';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Divider from '@/components/ui/Divider';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useLocalSearchParams } from 'expo-router';
import { useHabits } from '@/context/HabitsContext';
import { fetchTipOfTheDay } from '@/scripts/services/openaiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';




export default function DashboardScreen() {
  const { habits } = useHabits();
  const router = useRouter();
  const { user } = useUser();
  const { fresh } = useLocalSearchParams();
  const welcomeTitle = fresh === 'true' ? 'Welcome,' : 'Welcome back,';
  const [tip, setTip] = useState<string>('Loading tip...');
  const [tipError, setTipError] = useState<string | null>(null);

  useEffect(() => {
    const getCachedTip = async () => {
      try {
        const cachedTip = await AsyncStorage.getItem('tipOfTheDay');
        const cachedDate = await AsyncStorage.getItem('tipOfTheDayDate');
        const today = new Date().toISOString().split('T')[0]; 
        if (cachedTip && cachedDate === today) {
          setTip(cachedTip);
        } else {
          if (!user?.token) return;
          const result = await fetchTipOfTheDay(user.token);
          console.log('Tip result:', result);
          if (result.error) {
            setTipError('Could not load tip. Please try again.');
          } else {
            if (result.response) {
              setTip(result.response);
              await AsyncStorage.setItem('tipOfTheDay', result.response);
              await AsyncStorage.setItem('tipOfTheDayDate', today);
            }
          }
          
        }
      } catch (err) {
        setTipError('Error loading tip.');
        console.error('Tip cache error:', err);
      }
    };
  
    getCachedTip();
  }, [user?.token]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeText}>{welcomeTitle}</ThemedText>
      <ThemedText style={styles.nameText}>{user?.firstName}</ThemedText>
      <Divider />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Tip of the Day</ThemedText>
          <ThemedText style={styles.tipText}>
            {tipError ? tipError : tip}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.card]}>
          <ThemedText style={styles.cardTitle}>
            How do you want to journal today?
          </ThemedText>
          <ThemedView style={styles.journalOptions}>
            <TouchableOpacity style={[styles.optionButton, styles.unguided]} onPress={() => router.push({ pathname: '/main/journals', params: { openModal: 'true', option: 'blank' } })}>
              <ThemedText style={styles.optionText}>Blank Page</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, styles.guided]} onPress={() => router.push({ pathname: '/main/journals', params: { openModal: 'true', option: 'prompt', step: 'picker' } })}>
              <ThemedText style={styles.optionText}>Write with Prompts</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Habits</ThemedText>
          {habits.length === 0 ? (
            <ThemedView>
              <ThemedText>No habits yet. Add one to get started!</ThemedText>
              <ThemedText style={styles.addButtonText}>+</ThemedText>
            </ThemedView>
          ) : (
            habits.map((habit) => (
              <ThemedView key={habit.id} style={{ marginBottom: 10, backgroundColor: '#E4EAF2' }}>
                {habit.habitType === 'trigger-action' ? (
                  <ThemedView style={{ backgroundColor: habit.colour, borderRadius: 15, padding: 10 }}>
                  
                    <ThemedText style={[styles.cardContent, {backgroundColor: habit.colour}]}>
                      When I <ThemedText style={{ fontFamily: 'Comfortaa_400Regular', backgroundColor: habit.colour }}>{habit.trigger}</ThemedText>
                    </ThemedText>
                    <ThemedText style={[styles.cardContent, {backgroundColor: habit.colour, }]}>
                      I will <ThemedText style={{ fontFamily: 'Comfortaa_400Regular', backgroundColor: habit.colour }}>{habit.action}</ThemedText>
                    </ThemedText>
                  </ThemedView>
                ) : (
                  <ThemedView style={{ backgroundColor: habit.colour, borderRadius: 15, padding: 10 }}>
                    <ThemedText style={[styles.cardContentStandard, {backgroundColor: habit.colour}]}>{habit.habitName}</ThemedText>
                  </ThemedView>
                )}
              </ThemedView>
            ))
          )}
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Progress Overview</ThemedText>
          <ThemedView style={styles.progressContainer}>
            <ThemedText style={styles.progressText}>Today's Progress</ThemedText>
            <ThemedText style={styles.progressPercentage}>75%</ThemedText>
          </ThemedView>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60,
    marginBottom: '2%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '15%',
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
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Comfortaa_700Bold',
    backgroundColor: '#E4EAF2',
    padding: 5,
  },
  cardContentStandard: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Comfortaa_400Regular',
    backgroundColor: '#E4EAF2',
    padding: 5,
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
