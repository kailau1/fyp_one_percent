export const getLLMResponse = async (
    journalText: string,
    setLoading: (loading: boolean) => void,  
  ): Promise<string | null> => {
    setLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "Llama3.2:1B",
          content: "Analyze the user's journal entry and provide supportive, constructive feedback. Highlight their strengths, offer encouragement, and suggest practical self-improvement strategies tailored to their reflections. Don’t write about the user, write to them. Maintain a compassionate and encouraging tone throughout. Respond in a maximum of 300 words. :" + journalText,    
        }),
      };
  
      const response = await fetch('http://localhost:8085/api/llama', requestOptions);
  
      if (!response.ok) {
        const errorMessage = await response.text();
        return 'Failed to get response from LLaMA.';
      }
  
      const data = await response.json();
      return data.llmResponse; 
    } catch (error) {
      console.error(error);
      return 'An error occurred while processing the request.';
    } finally {
      setLoading(false);
    }
  };
  