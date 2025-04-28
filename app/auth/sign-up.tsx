import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ButtonCTA from '@/components/ui/ButtonCTA';
import InputFieldIcon from '@/components/InputFieldIcon';
import Header from '@/components/Header-Sub';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createUser } from '@/scripts/services/userService';
import { useUser } from '@/context/UserContext';

const SignUpScreen: React.FC = () => {
    const router = useRouter();
    const colourScheme = useColorScheme();
    const iconColour = colourScheme === 'dark' ? '#fff' : '#000';
    const { setUser } = useUser();

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

    const callCreateUser = async () => {
        if (!validateInputs()) return;
        await createUser(email, firstName, lastName, password, router, setLoading, setUser);
    };

    return (
        <ThemedView style={styles.container}>
            <Header title="Enter Your Details" onBackPress={() => router.back()} iconColour={iconColour} />
            <InputFieldIcon
                placeholder="Enter your email"
                icon="mail"
                onChangeText={newText => setEmail(newText)}
            />
            <InputFieldIcon
                placeholder="Password"
                icon="key"
                secureTextEntry={true}
                onChangeText={newText => setPassword(newText)}
            />
            <View style={styles.doubleTextFieldContainer}>
                <InputFieldIcon
                    placeholder="First Name"
                    onChangeText={newText => setFirstName(newText)}
                    isSmall={true}
                />
                <InputFieldIcon
                    placeholder="Last Name"
                    onChangeText={newText => setLastName(newText)}
                    isSmall={true}
                />
            </View>
            <ThemedView style={styles.errorContainer}>
                {errors.email && <Text style={styles.errorText}>* {errors.email}</Text>}
                {errors.firstName && <Text style={styles.errorText}>* {errors.firstName}</Text>}
                {errors.lastName && <Text style={styles.errorText}>* {errors.lastName}</Text>}
                {errors.password && <Text style={styles.errorText}>* {errors.password}</Text>}
            </ThemedView>
            <ThemedView style={styles.buttonContainer}>
                <ButtonCTA onPress={callCreateUser} title="Continue" disabled={loading} />
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
