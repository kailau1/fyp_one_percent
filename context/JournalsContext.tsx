import React, { createContext, useState, useContext, ReactNode, useEffect} from 'react';
import { getUserJournals } from '@/scripts/services/journalService';

export interface Journal {
    id: string;
    title: string;
    content: string;

}

interface JournalContextProps {
    journals: Journal[];
    setJournals: React.Dispatch<React.SetStateAction<Journal[]>>;
    fetchJournals: (userId: string) => Promise<void>;

}

const JournalsContext = createContext<JournalContextProps | undefined>(undefined);

export const JournalsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    
    const [journals, setJournals] = useState<Journal[]>([]);

    const fetchJournals = async (userId: string) => {
        const fetchedJournals = await getUserJournals(userId, (journals) => journals);
        setJournals(fetchedJournals || []);
    };

    return ( <JournalsContext.Provider value={{ journals, setJournals, fetchJournals }}>
        {children}
        </JournalsContext.Provider>
    );
};

export const useJournals = (): JournalContextProps => {
    const context = useContext(JournalsContext);
    if (!context) {
        throw new Error('useJournals must be used within a JournalsProvider');
    }
    return context;
};