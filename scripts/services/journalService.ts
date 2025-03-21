export interface Journal {
    id: string,
    title: string,
    content: string,
    createdAt: string,
}

export const createJournal = async (
    userId: string,
    title: string,
    content: string,
    llmResponse?: string,
): Promise <Journal | null> => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, title, content, llmResponse})
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
    try {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:8084/api/journals/${userId}`, requestOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('getUserJournals error:', errorMessage);
            return [];
        }

        const data = await response.json();
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
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(`http://localhost:8084/api/journals/${journalId}`, requestOptions);
        console.log('Delete Journal Entry Response status:', response.status);

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
    id: string,
    title: string,
    content: string,
    llmResponse: string
): Promise<Journal | null> => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id, title, content, llmResponse}),
        };

        console.log('updateJournalEntry requestOptions:', requestOptions.body);
        const response = await fetch(`http://localhost:8084/api/journals/entry`, requestOptions);
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



    


