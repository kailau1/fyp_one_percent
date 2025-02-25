import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import BottomNav from '@/components/ui/BottomNav';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Divider from '@/components/ui/Divider';

export default function JournalScreen() {
  const [entries, setEntries] = useState([
    { id: 1, date: '15th January 2025', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet ornare metus...' },
    { id: 2, date: '14th January 2025', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet ornare metus...' },
    { id: 3, date: '13th January 2025', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet ornare metus...' },
  ]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.header}>
            <ThemedText style={styles.headerText}>Journals</ThemedText>
        </ThemedView>
        {entries.map((entry) => (
          <TouchableOpacity style={styles.card}>
                <ThemedText style={styles.cardTitle}>{entry.date}</ThemedText>
                <ThemedText style={styles.cardContent}>{entry.content}</ThemedText>
            </TouchableOpacity>
        ))}
        <ThemedText style={styles.subHeader}>Start a New Journal</ThemedText> 
        <Divider />
        <ThemedView style={styles.journalOptions}>
            <TouchableOpacity style={[styles.optionButton, styles.unguided]}>
                <ThemedText style={styles.optionText}>Blank Page</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, styles.guided]}>
                <ThemedText style={styles.optionText}>Write with Prompts</ThemedText>
            </TouchableOpacity>
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
    padding: '3%',
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
    marginBottom: 10,
    fontFamily: 'Comfortaa_400Regular',
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Comfortaa_400Regular',
  },
});