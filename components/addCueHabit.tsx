import { useState, useEffect } from 'react';
import { ScrollView, Switch, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BottomNav from '@/components/ui/BottomNav';
import { getUserHabits, createHabit, completeHabit, uncompleteHabit } from '@/scripts/services/habitService';
import InputField from '@/components/InputField';
import { ProgressBar } from 'react-native-paper';
import { useUser } from '@/context/UserContext';
import Header from '@/components/Header-Sub';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AddCueHabit () {

    const styles = StyleSheet.create({
        habitInputContainer: {
        },
        subHeader: {
            
        },
    });

    <ThemedView style={styles.habitInputContainer}>
                <ThemedText style={styles.subHeader}>Habit Name</ThemedText>
    </ThemedView>
}