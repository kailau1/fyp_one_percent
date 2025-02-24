import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps {
    title: string;
    onBackPress: () => void;
    iconColour: string;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, iconColour }) => {
    return (
        <ThemedView style={styles.headerContainer}>
            <MaterialIcons 
                name="arrow-back" 
                size={28} 
                color={iconColour} 
                onPress={onBackPress} 
                style={styles.backIcon} 
            />
            <ThemedText style={styles.title}>{title}</ThemedText>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: '3%',
    },
    backIcon: {
        position: 'absolute',
        left: 10,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Comfortaa_400Regular',
        fontWeight: '500',
        fontSize: 32,
        marginTop: '14%',
        marginBottom: '3%',
        lineHeight: 36,
    },
});

export default Header;
