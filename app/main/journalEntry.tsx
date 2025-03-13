import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Divider from '@/components/ui/Divider';

import Header from '@/components/Header-Sub';
import BottomNav from '@/components/ui/BottomNav';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

// 1) Contexts and API
import { useJournals } from '@/context/JournalsContext';
import { useUser } from '@/context/UserContext';
import {
  createJournal,
  updateJournalEntry
} from '@/scripts/services/journalService';

export default function JournalEntryScreen() {
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [journalId, setJournalId] = useState<string | null>(null);

  const { user } = useUser();

  const params = useLocalSearchParams();
  
  const router = useRouter();
  const colorScheme = useColorScheme();
  const iconColour = colorScheme === 'dark' ? '#fff' : '#000';

  const { journals, fetchJournals } = useJournals();

  useEffect(() => {
    if (params.journalId) {
      setJournalId(params.journalId as string);
    }
  }, [params]);

  useEffect(() => {
    if (!journalId) return;

    const existingJournal = journals.find((j) => j.id === journalId);
    if (existingJournal) {
      setJournalTitle(existingJournal.title);
      setJournalContent(existingJournal.content);
    }
  }, [journalId, journals]);



  const handleSave = async () => {
    if (!user?.id) {
      console.log('No user logged in, cannot save');
      return;
    }

    try {
      if (journalId) {
        console.log('Updating journal:', journalContent);
        const updated = await updateJournalEntry(journalId, journalContent);
        if (updated) {
          console.log('Journal updated:', updated);
        }
      } else {
        console.log('Creating journal:', journalContent);
        const created = await createJournal(user.id, journalTitle, journalContent);
        if (created) {
          console.log('Journal created:', created);
        }
      }
      fetchJournals(user.id);

      router.back();
    } catch (error) {
      console.error('Error saving journal:', user.id, journalTitle, journalContent);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header 
        title="Write Your Journal"
        onBackPress={() => router.back()}
        iconColour={iconColour}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.entryCard}>
          <ThemedText style={styles.cardTitle}>
            {journalId ? 'Edit Your Entry' : 'Create a New Entry'}
          </ThemedText>
          <Divider />
            <ThemedView style={styles.fieldContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={journalTitle}
              onChangeText={(text) => {
                console.log('Title changed to:', text);
                setJournalTitle(text);
              }}
            />
            <TextInput
              style={styles.textField}
              placeholder="Start Writing Here!"
              multiline
              value={journalContent}
              onChangeText={setJournalContent}
            />
          </ThemedView>
        </ThemedView>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText}>
            {journalId ? 'Update Journal' : 'Save Journal'}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  entryCard: {
    backgroundColor: '#E4EAF2',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    height: '60%',
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
    textAlign: 'center',
    fontFamily: 'Comfortaa_400Regular',
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    marginBottom: 6,
  },
  titleInput: {
    backgroundColor: '#E4EAF2',
    paddingHorizontal: '1%',
    paddingVertical: 12,
    marginTop: '4%',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    outlineWidth: 0,
  },
  textField: {
    backgroundColor: '#E4EAF2',
    borderRadius: 6,
    marginTop: '2%',
    height: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: 'Comfortaa_400Regular',
    textAlignVertical: 'top',
    outlineWidth: 0,
  },
  fieldContainer: {
    marginTop: '5%',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: '#E4EAF2',
  },
  saveButton: {
    backgroundColor: '#74B7E2',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    color: '#000',
  },
});
