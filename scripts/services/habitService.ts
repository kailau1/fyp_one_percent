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

let colourCodes: Array<string> = ["#A7C7E7", "#B4E197", "#F8C8DC", "#D6A4E7", "#FDFD96", "#FFD1A9", "#AAF0D1", "#FAD1AF", "#E3D4FC", "#FCA3B7", "#AEEDEE"]

function getRandomColor () {
    return colourCodes[Math.floor(Math.random() * colourCodes.length)];

}

export const getUserHabits = async (
    userId: string

): Promise<any> => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        const response = await fetch(`http://localhost:8084/api/habits/user/${userId}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage);
            return;
        }

        const data = await response.json();
        console.log(data);

        const habitsWithColours = data.map((habit: any) => {
            return { ...habit, colour: getRandomColor() };
        });

        return habitsWithColours;

    } catch (error){
        console.error(error);
        console.log('Error', 'Something went wrong. Please try again.');
    }
}

export const completeHabit = async (
    habitId: string

): Promise<void> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }

        const response = await fetch(`http://localhost:8084/api/habits/completed/${habitId}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage);
            return;
        }
    } catch (error){
        console.error(error);
        console.log('Error', 'Something went wrong. Please try again.');
    }

}

export const uncompleteHabit = async (
    habitId: string

): Promise<void> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }

        const response = await fetch(`http://localhost:8084/api/habits/uncomplete/${habitId}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage);
            return;
        }
    } catch (error) {
        console.error(error);
        console.log('Error', 'Something went wrong. Please try again.');
    }
}