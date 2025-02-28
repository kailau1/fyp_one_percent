import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import BottomNav from '@/components/ui/BottomNav';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Divider from '@/components/ui/Divider';
import Header from '@/components/Header-Sub'
import {useRouter} from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function JournalEntryScreen () {

    const colourScheme = useColorScheme();
    const iconColour = colourScheme === 'dark' ? '#fff' : '#000';
    const router = useRouter()
    const [journalEntry, setJournalEntry] = useState<string>('');
    

    return (
        <ThemedView style={styles.container}>
            <Header title='Write Your Journal' onBackPress={() => router.back()} iconColour={iconColour}/>
                <TextInput style={styles.textField} placeholder='Start Writing Here!' multiline={true} onChangeText={newText => setJournalEntry(newText)}/>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center', 
        position: 'relative',
        height: '100%',
    },
    textField: {
        backgroundColor: '#E8F2F5',
        height: '60%',
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 15, 
        paddingTop: 15, 
        textAlignVertical: 'top', 
    }
})