import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ButtonCTA from '@/components/ui/ButtonCTA';
import InputField from '@/components/InputField';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

const SignUpScreen: React.FC = () => {
    const router = useRouter();
    const colourScheme = useColorScheme();
    const iconColour = colourScheme === 'dark' ? '#fff' : '#000';

    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<{ email?: string; firstName?: string; lastName?: string; password?: string }>({});

    const validateInputs = () => {
        const newErrors: typeof errors = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!password.trim()) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createUser = async () => {
        if (!validateInputs()) return;
        setLoading(true);
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, firstName, lastName, password }),
            };
            const response = await fetch('http://localhost:8080/api/users', requestOptions);
            if (!response.ok) {
                const errorMessage = await response.text();
                Alert.alert('Error', errorMessage);
                return;
            }
            const data = await response.json();
            Alert.alert('Success', 'Account created successfully!');
            router.push('../../main/dashboard');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <Header title="Enter Your Details" onBackPress={() => router.back()} iconColour={iconColour} />
                <InputField
                    placeholder="Enter your email"
                    icon="mail"
                    onChangeText={(text) => {
                        setEmail(text);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                />
                <InputField
                    placeholder="Password"
                    icon="key"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                />
            <View style={styles.doubleTextFieldContainer}>
                    <InputField
                        placeholder="First Name"
                        onChangeText={(text) => {
                            setFirstName(text);
                            if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                        }}
                        isSmall={true}
                    />
                    <InputField
                        placeholder="Last Name"
                        onChangeText={(text) => {
                            setLastName(text);
                            if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
                        }}
                        isSmall={true}
                    />
            </View>
            <ThemedView style={styles.errorContainer}>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </ThemedView>
            <ThemedView style={styles.buttonContainer}>
                <ButtonCTA onPress={createUser} title="Continue" disabled={loading} />
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center', 
        padding: 10,
        position: 'relative',
        height: '100%',
    },
    doubleTextFieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    errorContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '60%',
        position: 'absolute',
        bottom: 0,
        marginBottom: '4%',
    },
});

export default SignUpScreen;
