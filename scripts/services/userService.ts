import { Alert } from 'react-native';
import { Router } from 'expo-router';
import { User } from '@/context/UserContext';

export const createUser = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    router: Router, 
    setLoading: (loading: boolean) => void,
    setUser: (user: User | null) => void

): Promise<void> => {
    setLoading(true);
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, firstName, lastName, password }),
        };

        const response = await fetch('http://localhost:8084/api/users/create', requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            Alert.alert('Error', errorMessage);
            return;
        }
        const data = await response.json();
        Alert.alert('Success', 'Account created successfully!');
        setUser(data);
        router.push('../../main/dashboard?fresh=true');
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
        setLoading(false);
    }
};

export const loginUser = async (
    email: string,
    password: string,
    router: Router,
    setLoading: (loading: boolean) => void,
    setUser: (user: User | null) => void

): Promise<string | null> => {
    setLoading(true);
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        };

        const response = await fetch('http://localhost:8084/api/users/login', requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            Alert.alert('Error', errorMessage);
            return 'Invalid email or password';
        }

        const data = await response.json();
        console.log(data);
        setUser(data);
        Alert.alert('Success', 'Login successful!');

        router.push('../../main/dashboard');
        return null;
    } catch {
        return 'Something went wrong. Please try again';
    } finally {
        setLoading(false);
    }


}
