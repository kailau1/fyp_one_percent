import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent} from 'react-native';

interface ButtonCTAProps {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    disabled?: boolean;
}

const ButtonCTA: React.FC<ButtonCTAProps> = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create ({
    buttonContainer: {
        padding: 7,
        backgroundColor: '#74B7E2',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '10%',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Comfortaa_400Regular'
    }
});

export default ButtonCTA;