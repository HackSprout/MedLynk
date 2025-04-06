


export async function requestGemini(userMessage, email = "jasonboe510@gmail.com") {
    try {
      const response = await fetch(
        `https://medlynk.tech/api/chat/${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage, 
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Gemini response:", data);
      return {reply: data.response ? data.response : null};
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      throw error;
    }
  }


  export const fetchParsedPdfs = async (userEmail) => {
    try {
      const response = await fetch(`https://medlynk.tech/api/pdf/parse/${userEmail}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Check if the data has a 'message' key
      if (data.message) {
        throw new Error(`Error: ${data.message}`);
      }
  
      return data.parsed_texts;
    } catch (error) {
      console.error('Failed to fetch parsed PDFs:', error);
      return { error: error.message };
    }
  };
