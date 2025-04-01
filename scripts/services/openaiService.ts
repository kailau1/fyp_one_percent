import { BASE_URL } from '@env';


export const fetchOpenAIResponse = async (journalContent: string, token: string): Promise<{ error: string; response: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/api/ai/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ journalContent }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch OpenAI response');
        }

        const data = await response.json();
        return { error: '', response: data.response };
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
    context: string = ''
): Promise<{ error: string; prompts: string[] }> => {
    try {
        const response = await fetch(`${BASE_URL}/api/ai/prompt`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ context }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch journaling prompts');
        }

        const data = await response.json();
        return { error: '', prompts: data };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message, prompts: [] };
        } else {
            return { error: 'An unknown error occurred', prompts: [] };
        }
    }
};
