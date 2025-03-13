export interface Journal {
    id: string,
    title: string,
    content: string,
    createdAt: string,
}

export const createJournal = async (
    userId: string,
    title: string,
    content: string
): Promise <Journal | null> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, title, content})
        }

        const response = await fetch('http://localhost:8084/api/journals', requestOptions)

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('createJournal error:', errorMessage);
            return null;
        } else {
            console.log('createJournal response:', response);
        }

        const data = await response.json();
        console.log('createJournal data:', data);
        return data;

    } catch (error) {
        console.error('createJournal catch:', error);
        console.log('Error', 'Something went wrong. Please try again.', userId, title, content);
        return null;
    }
}

export const getUserJournals = async (
    userId: string,
    setJournals: (journals: Journal[]) => void
): Promise<Journal[]> => {
    console.log('getUserJournals called with userId:', userId);
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:8084/api/journals/${userId}`, requestOptions);
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('getUserJournals error:', errorMessage);
            return [];
        }

        const data = await response.json();
        console.log('getUserJournals data:', data);
        setJournals(data);
        return data;

    } catch (error) {
        console.error('getUserJournals catch:', error);
        console.log('Error', 'Something went wrong. Please try again.');
        return [];
    }
}

export const deleteJournalEntry = async (
    journalId: string,

): Promise<void> => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:8084/api/journals/${journalId}`, requestOptions);
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('getUserJournals error:', errorMessage);
        }

    } catch (error) {
        console.error('getUserJournals catch:', error);
        console.log('Error', 'Something went wrong. Please try again.');
    }
}

export const getJournalEntry = async (
    journalId: string
): Promise<Journal | null> => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}, 
        };

        const response = await fetch(`http://localhost:8084/api/journals/${journalId}`, requestOptions)
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('getUserJournals error: ', errorMessage);
        }
        
        const data = await response.json();
        console.log('getUserJournals data:', data);

        return data;
        
    } catch (error) {
        console.log('Error', 'Something went wrong. Please try again');
        return null
    }
}

export const updateJournalEntry = async (
    journalId: string,
    content: string
): Promise<Journal | null> => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content}),
        };

        const response = await fetch(`http://localhost:8084/api/journals/${journalId}`, requestOptions);
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('getUserJournals error:', errorMessage);
        }

        const data = await response.json();
        console.log('getUserJournals data:', data);
        return data;

    } catch (error) {
        console.log('Error', 'Something went wrong. Please try again');
        return null;
    }
}


    


