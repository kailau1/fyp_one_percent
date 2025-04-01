
import { BASE_URL } from "@env";

export interface Habit {
    id: string;
    habitName?: string;
    description?: string;
    completed: boolean;
    colour: string;
    habitType: 'standard' | 'trigger-action';
    trigger?: string; 
    action?: string;

}

export interface HabitHistory {
    date: string; 
    completed: boolean;
  }

export const createHabit = async (
    userId: string,
    habitName: string,
    description: string,
    complete: boolean,
    colour: string,
    token: string,
    habitType: 'standard' | 'trigger-action',
    trigger?: string,
    action?: string,
): Promise<Habit | null> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, habitName, description, complete, colour, habitType, trigger, action }),
        };

        const response = await fetch(`${BASE_URL}/api/habits/create`, requestOptions);

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
    token: string,
    setHabits: (habits: Habit[]) => void,

): Promise<Habit[]> => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const response = await fetch(`${BASE_URL}/api/habits/me`, requestOptions);
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('getUserHabits error:', errorMessage);
            return [];
        }

        const data = await response.json();
        setHabits(data);

        return data;

    } catch (error) {
        console.error('getUserHabits catch:', error);
        console.log('Error', 'Something went wrong. Please try again.');
        return [];
    }
};

export const completeHabit = async (
    habitId: string,
    token: string
): Promise<void> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const response = await fetch(`${BASE_URL}/api/habits/complete/${habitId}`, requestOptions);

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
    habitId: string,
    token: string
): Promise<void> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const response = await fetch(`${BASE_URL}/api/habits/uncomplete/${habitId}`, requestOptions);


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

export const updateHabit = async (
    habit: Habit,
    token: string
  ): Promise<Habit | null> => {
    try {
      console.log('updateHabit called with:', habit);
  
      const body = {
        id: habit.id,
        habitName: habit.habitName,
        description: habit.description,
        colour: habit.colour,
        habitType: habit.habitType,
        trigger: habit.trigger,
        action: habit.action,
      };
  
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
  
      console.log('Update body:', requestOptions.body);
      const response = await fetch(`${BASE_URL}/api/habits/update`, requestOptions);
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Update habit error:', errorMessage);
        return null;
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('updateHabit catch:', error);
      return null;
    }
  };
  

  export const deleteHabit = async (
    habitId: string,
    token: string
): Promise<boolean> => {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        const response = await fetch(`${BASE_URL}/api/habits/delete/${habitId}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('Delete habit error:', errorMessage);
            return false;
        }

        console.log(`Habit with ID ${habitId} deleted successfully.`);
        return true;
    } catch (error) {
        console.error('deleteHabit catch:', error);
        console.log('Error', 'Something went wrong. Please try again.');
        return false;
    }
};

export const fetchHabitHistory = async (
    habitId: string,
    token: string
  ): Promise<HabitHistory[]> => {
    try {
        const response = await fetch(`${BASE_URL}/api/habit-history/${habitId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
  
        console.log('Response status:', response.status);
  
        if (!response.ok) {
            throw new Error(await response.text());
        }
  
        const data = await response.json();
        console.log("Fetched habit history:", data);
        return data;
    } catch (err) {
        console.error('Error fetching habit history:', err);
        return [];
    }
  };