import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getUserHabits } from '@/scripts/services/habitService';

export interface Habit {
    id: string;
    habitName: string;
    description: string;
    completed: boolean;
    colour: string;
}

interface HabitsContextProps {
    habits: Habit[];
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
    fetchHabits: (userId: string) => Promise<void>;
}

const HabitsContext = createContext<HabitsContextProps | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        console.log('Habits context updated:', habits);
    }, [habits]);
    
    const fetchHabits = async (userId: string) => {
        const fetchedHabits = await getUserHabits(userId, (habits) => habits);
        setHabits(fetchedHabits || []);
    };

    return (
        <HabitsContext.Provider value={{ habits, setHabits, fetchHabits }}>
            {children}
        </HabitsContext.Provider>
    );
};

export const useHabits = (): HabitsContextProps => {
    const context = useContext(HabitsContext);
    if (!context) {
        throw new Error('useHabits must be used within a HabitsProvider');
    }
    return context;
};