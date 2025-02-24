export interface Habit {
    id: string;
    habitName: string;
    description: string;
    completed: boolean;
    colour: string;
}

export const createHabit = async (
    userId: string,
    habitName: string,
    description: string,
    complete: boolean,
    colour: string,
): Promise<Habit | null> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, habitName, description, complete, colour }),
        };

        const response = await fetch('http://localhost:8084/api/habits/create', requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('createHabit error:', errorMessage);
            return null;
        }

        const data = await response.json();
        console.log('createHabit data:', data);
        return data;

    } catch (error) {
        console.error('createHabit catch:', error);
        console.log('Error', 'Something went wrong. Please try again.');
        return null;
    }
};

export const getUserHabits = async (
    userId: string,
    setHabits: (habits: Habit[]) => void
): Promise<Habit[]> => {
    console.log('getUserHabits called with userId:', userId);
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:8084/api/habits/user/${userId}`, requestOptions);
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('getUserHabits error:', errorMessage);
            return [];
        }

        const data = await response.json();
        console.log('getUserHabits data:', data);
        setHabits(data);

        const habitsWithColours = data.map((habit: any) => ({ ...habit }));
        return habitsWithColours;

    } catch (error) {
        console.error('getUserHabits catch:', error);
        console.log('Error', 'Something went wrong. Please try again.');
        return [];
    }
};

export const completeHabit = async (
    habitId: string
): Promise<void> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:8084/api/habits/completed/${habitId}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage);
            return;
        }

    } catch (error) {
        console.error(error);
        console.log('Error', 'Something went wrong. Please try again.');
    }
};

export const uncompleteHabit = async (
    habitId: string
): Promise<void> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

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
};