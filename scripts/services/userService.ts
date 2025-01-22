// services/userService.ts
import { Alert } from 'react-native';
import { Router } from 'expo-router';

// Define the createUser function
export const createUser = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    router: Router, 
    setLoading: (loading: boolean) => void 
): Promise<void> => {
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
