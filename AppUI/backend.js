import AsyncStorage from "@react-native-async-storage/async-storage";

export async function requestGemini(
  userMessage,
  email = "jasonboe510@gmail.com"
) {
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
    return { reply: data.response ? data.response : null };
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    throw error;
  }
}

export const fetchParsedPdfs = async (userEmail) => {
  try {
    const response = await fetch(
      `https://medlynk.tech/api/pdf/parse/${userEmail}`,
      {
        method: "GET",
      }
    );

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
    console.error("Failed to fetch parsed PDFs:", error);
    return { error: error.message };
  }
};

// Function to save email to AsyncStorage
export const saveEmailToCache = async (email) => {
  try {
    await AsyncStorage.setItem("user_email", email);
    console.log("Email saved!");
  } catch (error) {
    console.error("Error saving email:", error);
  }
};

// Function to retrieve email from AsyncStorage
export const getEmailFromCache = async () => {
  try {
    const storedEmail = await AsyncStorage.getItem("user_email");
    return storedEmail ? storedEmail : null;
  } catch (error) {
    console.error("Error retrieving email:", error);
    return null;
  }
};

// Function to clear the stored email from AsyncStorage
export const clearEmailFromCache = async () => {
  try {
    await AsyncStorage.removeItem("user_email");
    console.log("Email cleared from cache!");
  } catch (error) {
    console.error("Error clearing email:", error);
  }
};

export const loginWithCalendly = async () =>  {
  const result = await WebBrowser.openAuthSessionAsync(
    "https://calendly.com/oauth/authorize?client_id=DHTNpWLjpfDr8Ode2UPoWrDCU4JHORCWHtcvTdFkmB8&redirect_uri=https://medlynk.tech/api/oauth&response_type=code&scope=default",
    "https://medlynk.tech/api/oauth"
  );

  if (result.type === "success" && result.url) {
    const response = await fetch(result.url);
    const data = await response.json();
    console.log("User email:", data.email);
    return data.email;
  } else {
    console.log("Login cancelled or failed.");
  }
}

export async function getSchedLink(userEmail, doctorEmail) {
  try {
    const response = await fetch(`https://medlynk.tech/api/oauth/schedule/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: userEmail,
        doctor_email: doctorEmail,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.error}`);
    }

    const data = await response.json();
    console.log("Schedule response:", data.booking_url);
    return { reply: data.booking_url ? data.booking_url : null };
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    throw error;
  }
}

export const getAppointments = async (userEmail) => {
  try {
    const response = await fetch(
      `https://medlynk.tech/api/oauth/appointments/${userEmail}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if the data has a 'message' key
    if (data.message) {
      throw new Error(`Error: ${data.message}`);
    }

    return data.appointments;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return { error: error.message };
  }
};
