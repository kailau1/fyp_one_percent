import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNav from '@/components/ui/BottomNav';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Divider from '@/components/ui/Divider';
import { useRouter } from 'expo-router';

import { useJournals } from '@/context/JournalsContext';
import { useUser } from '@/context/UserContext';

export default function JournalScreen() {
  const { journals, fetchJournals } = useJournals();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      fetchJournals(user.id);
    } else {
      console.log("No user ID found");
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerText}>Journals</ThemedText>
        </ThemedView>
        <Divider />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedText style={styles.subHeader}>Start a New Journal</ThemedText> 
        <ThemedView style={styles.journalOptions}>
          <TouchableOpacity 
            style={[styles.optionButton, styles.unguided]} 
            onPress={() => router.push('./journalEntry')}
          >
            <ThemedText style={styles.optionText}>Blank Page</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionButton, styles.guided]}>
            <ThemedText style={styles.optionText}>Write with Prompts</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {journals.map((entry) => (
          <TouchableOpacity 
            key={entry.id}
            style={styles.card} 
            onPress={() => {  
              router.push({
                pathname: './journalEntry',
                params: { journalId: entry.id },
              });
            }}>
            <ThemedText style={styles.cardTitle}>{entry.title}</ThemedText>
            <ThemedText style={styles.dateText}>
              {new Date(entry.createdAt).toLocaleString()}
            </ThemedText>
            <ThemedText style={styles.cardContent} numberOfLines={3} ellipsizeMode='tail'>{entry.content}</ThemedText>
          </TouchableOpacity>
        ))}
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
    padding: '3%',
    marginBottom: '25%',
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
    textAlign: 'center',
    fontFamily: 'Comfortaa_400Regular',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: '1%',
    marginTop: '5%',
    fontFamily: 'Comfortaa_400Regular',
    textAlign: 'center',
  },
  journalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#F7F9FC',
    marginBottom: '5%',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: '10%',
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
  card: {
    backgroundColor: '#E4EAF2',
    borderRadius: 16,
    padding: '3%',
    margin: '2%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#878787',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    fontFamily: 'Comfortaa_400Regular',
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Comfortaa_400Regular',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Comfortaa_400Regular',
  },

});