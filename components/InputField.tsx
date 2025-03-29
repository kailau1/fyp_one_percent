import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface InputFieldProps extends TextInputProps {
    placeholder: string;
    icon?: keyof typeof MaterialIcons.glyphMap; 
    style?: object; 
    isSmall?: boolean;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
    placeholder, 
    icon, 
    secureTextEntry, 
    onChangeText, 
    value, // Add value prop here
    style, 
    isSmall, 
    error, 
    ...rest 
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.textField, isSmall && styles.textFieldSmall]}
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value} 
                {...rest} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#F0F0F0',
        position: 'relative',
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        marginTop: '1%',
        marginBottom: '2%',
    },
    textField: {
        padding: 10,
        width: '100%',
        fontSize: 18,
        fontFamily: 'Comfortaa_400Regular',
        outlineWidth: 0,
    },
    textFieldSmall: {
        fontSize: 18, 
        padding: 8,
    },
});

export default InputField;