import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';

interface ButtonCTAProps {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    disabled?: boolean;
    style?: ViewStyle;   
}

const ButtonCTA: React.FC<ButtonCTAProps> = ({ onPress, title, disabled, style }) => (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.buttonContainer, style]} 
        disabled={disabled}
    >
        <Text style={[styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create ({
    buttonContainer: {
        padding: 10,
        backgroundColor: '#74B7E2',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '10%',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Comfortaa_400Regular',
        color: 'black',
    }
});

export default ButtonCTA;
