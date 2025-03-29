import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ButtonCTA from '@/components/ui/ButtonCTA';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@/context/UserContext';
import { useHabits } from '@/context/HabitsContext';
import { getUserHabits } from '@/scripts/services/habitService';
import { useJournals } from '@/context/JournalsContext';

export default function LandingScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { fetchHabits } = useHabits();
  const { fetchJournals } = useJournals();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        if (stored) {
          const parsedUser = JSON.parse(stored);
          setUser(parsedUser);

          await fetchHabits(parsedUser.token);
          await fetchJournals(parsedUser.token);

          router.replace('/main/dashboard');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Session restore error:', error);
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#74B7E2" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>One Percent</Text>
      <ThemedText style={styles.subtitle}>
        Improving 1% everyday results in being 37 times better after 1 year!
      </ThemedText>
      <ThemedView style={styles.buttonContainer}>
        <ButtonCTA onPress={() => router.push('../auth/sign-up')} title="Sign Up" />
        <ButtonCTA onPress={() => router.push('../auth/login')} title="Login" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
    height: '100%',
  },
  center: {
    justifyContent: 'center',
  },
  title: {
    color: '#74B7E2',
    fontSize: 60,
    fontWeight: '500',
    padding: 50,
    fontFamily: 'Itim_400Regular',
    textAlign: 'center',
    marginTop: '35%',
  },
  subtitle: {
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '30%',
    fontFamily: 'Comfortaa_400Regular',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '60%',
    position: 'absolute',
    bottom: 0,
    marginBottom: '4%',
  },
});
