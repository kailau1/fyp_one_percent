import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useJournals } from '@/context/JournalsContext';
import { useUser } from '@/context/UserContext';
import { createJournal, updateJournalEntry } from '@/scripts/services/journalService';
import { ThemedText } from '@/components/ThemedText';
import Divider from '@/components/ui/Divider';
import { fetchOpenAIResponse } from '@/scripts/services/openaiService';
import Markdown from 'react-native-markdown-display';

interface JournalEntryScreenProps {
  onClose: () => void;
  journalId: string | null;
}

export default function JournalEntryScreen({ onClose, journalId }: JournalEntryScreenProps) {
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { journals, fetchJournals } = useJournals();

  useEffect(() => {
    if (!journalId) return;
    const existingJournal = journals.find((j) => j.id === journalId);
    if (existingJournal) {
      setJournalTitle(existingJournal.title);
      setJournalContent(existingJournal.content);
      if (existingJournal.llmResponse) {
        setAiFeedback(existingJournal.llmResponse);
      }
    }
  }, [journalId, journals]);

  const handleSave = async () => {
    console.log("HandleSave Called")
    if (!user?.id) {
      console.log('No user logged in, cannot save');
      return;
    }
    if (journalContent.trim() === '' && journalTitle.trim() === '') {
      onClose();
      return;
    }

    try {
      if (journalId) {
        await updateJournalEntry(journalId, journalTitle, journalContent, aiFeedback);
      } else {
        await createJournal(user.id, journalTitle, journalContent, aiFeedback);
      }
      fetchJournals(user.id);
      onClose(); 
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };

  const getAiFeedback = async () => {
    if (!journalContent.trim()) {
      alert("Write something before requesting AI feedback!");
      return;
    }
    setLoading(true);
    setAiFeedback(""); 
    try {
      const response = await fetchOpenAIResponse(journalContent);
    
      if (response.error) {
        throw new Error(response.error);
      }
  
      if (response.choices && response.choices.length > 0) {
        setAiFeedback(response.choices[0].message.content);
      } else {
        setAiFeedback("No feedback available.");
      }
  
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
      setAiFeedback("Failed to get feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const markdownStyles ={
    body: {
      fontFamily: 'Comfortaa_400Regular',
      fontSize: 16,
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <ThemedText style={styles.date}>{new Date().toDateString()}</ThemedText>
        <TouchableOpacity onPress={getAiFeedback}>
          <ThemedText style={styles.linkText}>Get AI Feedback</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <ThemedText style={styles.completeText}>Done</ThemedText>
        </TouchableOpacity>
      </View>
      <Divider />
      <TextInput
        style={styles.textFieldTitle}
        placeholder="Title"
        value={journalTitle}
        onChangeText={setJournalTitle}
      />
      <TextInput
        style={styles.textFieldContent}
        placeholder="Start writing..."
        multiline
        autoFocus
        value={journalContent}
        onChangeText={setJournalContent}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />
      ) : aiFeedback.trim() !== "" ? ( 
        <View style={styles.aiFeedbackBox}>
          <ScrollView>
            <Markdown style={markdownStyles}>{aiFeedback}</Markdown>
          </ScrollView>
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    backgroundColor: '#FFF',
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  completeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E44AD',
  },
  textFieldTitle: {
    padding: 20,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    outlineWidth: 0,
  },
  textFieldContent: {
    flex: 1,
    padding: 20,
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: 'Comfortaa_400Regular',
    outlineWidth: 0,
  },
  feedbackButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  feedbackText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  aiFeedbackBox: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#F3F3F3',
    padding: 15,
    borderRadius: 8,
    height: '40%',
  },
  aiFeedbackText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Comfortaa_400Regular',
  },
  loading: {
    marginTop: 10,
  },
});