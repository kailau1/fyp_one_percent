import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

export default function BottomNav () {
    const router = useRouter()

    return (
        <ThemedView style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItemContainer} onPress={() => router.push('../main/dashboard')}>
                <Image style={styles.navItemIcon} source={require('../../assets/images/dashboard.png')} />
                <ThemedText style={styles.navItem}>Dashboard</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItemContainer} onPress={() => router.push('../main/journals')}>
                <Image style={styles.navItemIcon} source={require('../../assets/images/menu_book.png')}/>
                <ThemedText style={styles.navItem}>Journal</ThemedText>
            </TouchableOpacity>
                <TouchableOpacity style={styles.navItemContainer} onPress={() => router.push('../main/habits')}>
                        <Image style={styles.navItemIcon} source={require('../../assets/images/fact_check.png')} />
                        <ThemedText style={styles.navItem} >Habits</ThemedText>
                </TouchableOpacity>
            <ThemedView style={styles.navItemContainer}>
                <Image style={styles.navItemIcon} source={require('../../assets/images/person.png')} />
                <ThemedText style={styles.navItem}>Account</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: '#878787',
    backgroundColor: '#E4EAF2',
},
navItemContainer: {
    alignItems: 'center',
    backgroundColor: '#E4EAF2',
},
navItemIcon: {
    width: 28,
    height: 28,
},
navItem: {
    fontSize: 16,
    fontFamily: 'Comfortaa_400Regular',
    fontWeight: 500,
}


})