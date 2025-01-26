import { Router } from 'expo-router';

export const createHabit = async (
    userId: string,
    habitName: string,
    description: string,
    complete: boolean,
    router: Router

): Promise<void> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, habitName, description, complete }),
        }

        const response = await fetch('http://localhost:8084/api/habits', requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage);
            return;
        }

        const data = await response.json();
        console.log(data);

    } catch (error){
        console.error(error);
        console.log('Error', 'Something went wrong. Please try again.');
    }
}

export const getUserHabits = async (
    userId: string

): Promise<any> => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        const response = await fetch(`http://localhost:8084/api/habits/${userId}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage);
            return;
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error){
        console.error(error);
        console.log('Error', 'Something went wrong. Please try again.');
    }
}

