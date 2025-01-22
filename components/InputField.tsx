import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps,Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface InputFieldProps extends TextInputProps {
    placeholder: string;
    icon?: keyof typeof MaterialIcons.glyphMap; 
    style?: object; 
    isSmall?: boolean;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, icon, secureTextEntry, onChangeText, style, isSmall, error, ...rest }) => {
    return (
            <View style={[styles.inputContainer, isSmall && styles.smallInputContainer, style]}>
                {icon && (
                    <MaterialIcons name={icon} size={20} color="#aaa" style={styles.iconTextField} />
                )}
                <TextInput
                    style={[styles.textField, isSmall && styles.textFieldSmall]}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
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
        paddingLeft: '8%',
        marginTop: '5%',
        marginBottom: '2%',
    },
    smallInputContainer: {
        width: '45%', 
        paddingLeft: '1%',
        flexDirection: 'row',
    },
    iconTextField: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
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
