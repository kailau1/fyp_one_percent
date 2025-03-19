import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Modal } from 'react-native';
import BottomNav from '@/components/ui/BottomNav';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Divider from '@/components/ui/Divider';
import JournalEntryScreen from '@/app/main/journalEntry'; 
import { useJournals } from '@/context/JournalsContext';
import { useUser } from '@/context/UserContext';
import { deleteJournalEntry } from '@/scripts/services/journalService';
import { MaterialIcons } from '@expo/vector-icons';

export default function JournalScreen() {
  const { journals, fetchJournals } = useJournals();
  const { user } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null); 
  const [optionsVisible, setOptionsVisible] = useState<string | null>(null); 

  useEffect(() => {
    if (user?.id) {
      fetchJournals(user.id);
    } else {
      console.log("No user ID found");
    }
  }, []);

  const handleDeleteJournal = async (journalId: string) => {
    console.log('Deleting Journal Entry with ID:', journalId);

    try {
      await deleteJournalEntry(journalId);
       if (user?.id) {
        fetchJournals(user.id);
       }
      setOptionsVisible(null); 
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

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
            style={[styles.typeButton, styles.unguided]} 
            onPress={() => setIsModalVisible(true)} 
          >
            <ThemedText style={styles.typeText}>Blank Page</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.typeButton, styles.guided]}>
            <ThemedText style={styles.typeText}>Write with Prompts</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {[...journals]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((entry) => (
          <View key={entry.id}>
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => {setIsModalVisible(true);
                setSelectedJournalId(entry.id); 
              }} 
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText style={styles.cardTitle}>{entry.title}</ThemedText>
                <TouchableOpacity 
                style={styles.optionsButton} 
                onPress={() => setOptionsVisible(optionsVisible === entry.id ? null : entry.id)}
                >
                <MaterialIcons name="more-vert" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <ThemedText style={styles.dateText}>
                {new Date(entry.createdAt).toLocaleString()}
              </ThemedText>
              <ThemedText style={styles.cardContent} numberOfLines={3} ellipsizeMode='tail'>{entry.content}</ThemedText>
            </TouchableOpacity>
            {optionsVisible === entry.id && (
              <View style={styles.optionsMenu}>
                <TouchableOpacity 
                  onPress={() => { console.log("Delete button working.");
                    handleDeleteJournal(entry.id);
                  }}
                  style={styles.optionItem}
                >
                  <ThemedText style={styles.optionText}>Delete</ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <BottomNav />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
          <JournalEntryScreen 
            onClose={() => {
              setIsModalVisible(false);
              setSelectedJournalId(null); 
            }}
            journalId={selectedJournalId} 
          />          
          </View>
        </View>
      </Modal>
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
    fontWeight: '600',
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
  typeButton: {
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
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%', 
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: '10%',
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
  optionsButton: {
    marginRight: 10,
  },
  optionsMenu: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    width: 100,
  },
  optionItem: {
    padding: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Comfortaa_400Regular',
    textAlign: 'center',
    color: '#333', 
    paddingVertical: 8, 
  }
});
