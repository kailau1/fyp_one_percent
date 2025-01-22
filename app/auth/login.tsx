import { Image, StyleSheet, View, Text, TextInput, StyleProp, TextStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ButtonCTA from '@/components/ui/ButtonCTA';
import {useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';


export default function LoginScreen() {
    const router = useRouter();
    const colourScheme = useColorScheme();
    const iconColour = colourScheme === 'dark' ? '#fff' : '#000';
    return (
        <ThemedView style={styles.container}>
            {/* Header section */}
            <ThemedView style={styles.headerContainer}>
                <MaterialIcons name="arrow-back" size={28} color={iconColour} onPress={() => router.back()} style={styles.backIcon}/>
                <ThemedText style={styles.title}>Enter Your Details</ThemedText> 
            </ThemedView>
            <View style={styles.inputContainer}>
            {/* Email Input */}
            <MaterialIcons name="mail" size={20} color="#aaa" style={styles.icon} />
            <TextInput
                style={styles.textFieldLarge}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
            />
            </View>
            <View style={styles.inputContainer}>
            {/* Password Input */}  
            <MaterialIcons name="key" size={20} color="#aaa" style={styles.icon} />
            <TextInput
                style={styles.textFieldLarge}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={true}
            />
            </View>
            {/* CTA Button */}
            <ThemedView style={styles.buttonContainer}>
                <ButtonCTA onPress={() => console.log('Button Pressed')} title='Login' />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        position: 'relative',
        height: '100%',
    },
    backIcon: {
        position: 'absolute',
        left: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: '3%',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Comfortaa_400Regular',
        fontWeight: 500,
        fontSize: 32,
        marginTop: '14%',
        marginBottom: '3%',
        lineHeight: 36,
    },
    textFieldsContainer: {
        alignItems: 'center',
        padding: 10,
        position: 'relative',
        width: '100%',
        marginTop: '7%'
    },
    textFieldLarge: {
        padding: 10,
        width: '100%',
        fontFamily: 'Comfortaa_400Regular',
        outlineWidth: 0,
        fontSize: 18
    },
    inputContainer: {
        backgroundColor: '#F0F0F0',
        position: 'relative', 
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingLeft: '8%', 
        marginTop: '5%',
    },
    icon: {
        position: 'absolute', 
        left: 10,
        top: '50%',
        transform: [{ translateY: -10 }], 
    },
    buttonContainer: {
        alignItems: 'center',
        width: '60%',
        position: 'absolute',
        bottom: 0,
        marginBottom: '4%',
      }
});