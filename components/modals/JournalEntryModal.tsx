import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useJournals } from '@/context/JournalsContext';
import { useUser } from '@/context/UserContext';
import { createJournal, updateJournalEntry } from '@/scripts/services/journalService';
import { fetchOpenAIResponse } from '@/scripts/services/openaiService';
import { ThemedText } from '@/components/ThemedText';
import ButtonCTA from '@/components/ui/ButtonCTA';
import Divider from '@/components/ui/Divider';
import Markdown from 'react-native-markdown-renderer';

interface JournalEntryScreenProps {
  onClose: () => void;
  journalId: string | null;
  initialContent?: string;
}

export default function JournalEntryScreen({ onClose, journalId, initialContent }: JournalEntryScreenProps) {
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // If there is no journalId then the text fields are automatically editable.
  const [isEditing, setIsEditing] = useState(journalId ? false : true);
  const { user } = useUser();
  const { journals, fetchJournals } = useJournals();

  useEffect(() => {
    if (journalId) {
      const existingJournal = journals.find((j) => j.id === journalId);
      if (existingJournal) {
        setJournalTitle(existingJournal.title);
        setJournalContent(existingJournal.content);
        if (existingJournal.llmResponse) {
          setAiFeedback(existingJournal.llmResponse);
        }
      }
    } else if (initialContent) {
      setJournalContent(initialContent);
    }
  }, [journalId, journals, initialContent]);

  const handleSave = async () => {
    const trimmedTitle = journalTitle.trim();
    const trimmedContent = journalContent.trim();
    const trimmedPrompt = initialContent?.trim() ?? '';
    const isEmpty = trimmedTitle === '' && trimmedContent === '';
    const isJustPrompt = trimmedContent === trimmedPrompt;

    if (isEmpty || isJustPrompt || !user?.id) {
      onClose();
      return;
    }

    try {
      if (journalId) {
        await updateJournalEntry(journalId, journalTitle, journalContent, user.token, aiFeedback);
      } else {
        await createJournal(journalTitle, journalContent, user.token, aiFeedback);
      }
      fetchJournals(user.token);
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
    setAiFeedback('');
    try {
      if (!user) throw new Error("User is not logged in");
      const response = await fetchOpenAIResponse(journalContent, user.token);
      if (response.error) throw new Error(response.error);
      setAiFeedback(response.response || 'No feedback available.');
      // Open the modal to show feedback
      setShowFeedbackModal(true);
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
      setAiFeedback("Failed to get feedback. Please try again.");
      setShowFeedbackModal(true);
    } finally {
      setLoading(false);
    }
  };

  const markdownStyles = {
    text: {
      fontFamily: 'Comfortaa_400Regular',
      fontSize: 20,
    },
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <ThemedText style={styles.date}>{new Date().toDateString()}</ThemedText>
            {journalId && (
              <TouchableOpacity onPress={() => setIsEditing(prev => !prev)}>
                <ThemedText style={styles.linkText}>
                  {isEditing ? 'Stop Editing' : 'Edit'}
                </ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleSave}>
              <ThemedText style={styles.completeText}>Done</ThemedText>
            </TouchableOpacity>
          </View>
  
          <TextInput
            style={styles.textFieldTitle}
            placeholder="Title"
            value={journalTitle}
            editable={isEditing}
            onChangeText={setJournalTitle}
          />
  
          <Divider />
  
          {/* Journal content is scrollable on its own */}
          <TextInput
            style={styles.textFieldContent}
            multiline
            placeholder="Write your journal entry..."
            value={journalContent}
            editable={isEditing}
            onChangeText={setJournalContent}
            textAlignVertical="top"
            scrollEnabled
          />
  
          {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />}
        </View>
  
        {/* Fixed footer */}
        <View style={styles.footer}>
          <ButtonCTA
            title={aiFeedback.trim() === '' ? 'Get Feedback' : 'View Feedback'}
            onPress={aiFeedback.trim() === '' ? getAiFeedback : () => setShowFeedbackModal(true)}
          />
        </View>
  
        {/* AI Feedback Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={showFeedbackModal}
          onRequestClose={() => setShowFeedbackModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.feedbackTitle}>AI Feedback</ThemedText>
                <TouchableOpacity onPress={() => setShowFeedbackModal(false)}>
                  <ThemedText style={styles.closeText}>Close</ThemedText>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScroll} nestedScrollEnabled>
                <Markdown style={markdownStyles}>{aiFeedback}</Markdown>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },
  date: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Comfortaa_400Regular',
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
    fontFamily: 'Comfortaa_700Bold',
  },
  textFieldTitle: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Comfortaa_700Bold',
  },
  textFieldContent: {
    fontSize: 16,
    fontFamily: 'Comfortaa_400Regular',
    paddingVertical: 10,
    minHeight: 150,
    maxHeight: '70%',
    color: '#000',
    textAlignVertical: 'top',
    marginTop: '5%',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loading: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '100%',
    height: '88%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    paddingBottom: 10,
  },
  modalScroll: {
    flex: 1,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Comfortaa_700Bold',
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    fontFamily: 'Comfortaa_700Bold',
  },
});