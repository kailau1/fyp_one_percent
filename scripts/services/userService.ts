import { Alert } from 'react-native';
import { Router } from 'expo-router';
import { User } from '@/context/UserContext';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '@env';

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

        console.log("URL:", `${BASE_URL}/api/users/create`);
        const response = await fetch(`${BASE_URL}/api/users/create`, requestOptions);

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

export const loginUser = async (email: string, password: string) => {
    
    try {
        const response = await fetch(`${BASE_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Failed to login");
        }

        const data = await response.json();
        const token = data.token;
        
        interface DecodedToken {
            id: string;
            userId: string;
            email: string;
            firstName: string;
            lastName: string;
        }

        const decodedToken = jwtDecode<DecodedToken>(token);

        const user = {
            id: decodedToken.userId,
            email: decodedToken.email,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            token: token,
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));

        return user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};