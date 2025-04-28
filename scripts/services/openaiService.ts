import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;


export const fetchOpenAIResponse = async (journalId: string, journalContent: string, userId: string, token: string)
    : Promise<{ error: string; response: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/api/ai/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                journalId: journalId ?? null,
                journalContent,
                userId
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch OpenAI response');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message, response: '' };
        } else {
            return { error: 'An unknown error occurred', response: '' };
        }
    }

}

export const fetchTipOfTheDay = async (token: string): Promise<{ error: string; response: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/api/ai/tip`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("Tip of the Day URL:", `${BASE_URL}/api/ai/tip`);

        if (!response.ok) {
            throw new Error('Failed to fetch Tip of the Day');
        }

        const data = await response.json();
        console.log("Tip of the Day:", data.response);
        return { error: '', response: data.response };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message, response: '' };
        } else {
            return { error: 'An unknown error occurred', response: '' };
        }
    }
};


export const fetchJournalingPrompts = async (
    token: string,
    userId: string,
): Promise<{ error: string; prompts: string[] }> => {
    try {
        console.log("Fetching prompt at URL:", `${BASE_URL}/api/ai/prompt/${userId}`);
        const response = await fetch(`${BASE_URL}/api/ai/prompt/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch prompts: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched prompts:', data);
        if (!Array.isArray(data)) {
            throw new Error('Invalid server response: expected an array of prompts');
        }

        return { error: '', prompts: data };
    } catch (error) {
        if (error instanceof Error) {
            console.error('[fetchJournalingPrompts] Error:', error.message);
            return { error: error.message, prompts: [] };
        } else {
            console.error('[fetchJournalingPrompts] Unknown error:', error);
            return { error: 'An unknown error occurred', prompts: [] };
        }
    }
};