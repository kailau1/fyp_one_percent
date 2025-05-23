import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getUserHabits } from '@/scripts/services/habitService';
import { fetchHabitHistory as fetchHabitHistoryAPI } from '@/scripts/services/habitService';


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

  interface HabitsContextProps {
    habits: Habit[];
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
    fetchHabits: (token: string) => Promise<void>;
  
    habitHistory: Record<string, HabitHistory[]>;
    fetchHabitHistory: (habitId: string, token: string) => Promise<void>;
  }

const HabitsContext = createContext<HabitsContextProps | undefined>(undefined);


export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitHistory, setHabitHistory] = useState<Record<string, HabitHistory[]>>({});

  const fetchHabits = async (token: string) => {
    const fetchedHabits = await getUserHabits(token, setHabits);
    setHabits(fetchedHabits || []);
  };

  const fetchHabitHistory = async (habitId: string, token: string) => {
    const history = await fetchHabitHistoryAPI(habitId, token);
    setHabitHistory(prev => ({ ...prev, [habitId]: history }));
  };

  return (
    <HabitsContext.Provider value={{ habits, setHabits, fetchHabits, habitHistory, fetchHabitHistory }}>
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