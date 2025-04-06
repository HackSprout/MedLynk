// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as WebBrowser from 'expo-web-browser';

// export const fetchParsedPdfs = async (userEmail) => {
//   try {
//     const response = await fetch(`https://medlynk.tech/api/parse/${userEmail}`, {
//       method: 'GET',
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Check if the data has a 'message' key
//     if (data.message) {
//       throw new Error(`Error: ${data.message}`);
//     }

//     return data.parsed_texts;
//   } catch (error) {
//     console.error('Failed to fetch parsed PDFs:', error);
//     return { error: error.message };
//   }
// };

// // these 2 go after log in finsihes and home page opens
// const userEmail = 'user@example.com'; // hard code this to jason email 

// const result = await fetchParsedPdfs(userEmail);

// export const chatWithGemini = async (user_email, message) => {
//   const url = `https://medlynk.tech/api/chat/${user_email}`;
//   const data = { message };

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();

//     // Check if the response contains a 'response' field
//     if (responseData && responseData.response) {
//       return responseData.response;
//     } else {
//       throw new Error('No response data found');
//     }
//   } catch (error) {
//     console.error('Error during chat request:', error);
//     return { error: error.message };
//   }
// };

// // Function to save email to AsyncStorage
// export const saveEmailToCache = async (email) => {
//   try {
//     await AsyncStorage.setItem('user_email', email);
//     console.log('Email saved!');
//   } catch (error) {
//     console.error('Error saving email:', error);
//   }
// };

// // Function to retrieve email from AsyncStorage
// export const getEmailFromCache = async () => {
//   try {
//     const storedEmail = await AsyncStorage.getItem('user_email');
//     return storedEmail ? storedEmail : null;
//   } catch (error) {
//     console.error('Error retrieving email:', error);
//     return null;
//   }
// };

// // Function to clear the stored email from AsyncStorage
// export const clearEmailFromCache = async () => {
//   try {
//     await AsyncStorage.removeItem('user_email');
//     console.log('Email cleared from cache!');
//   } catch (error) {
//     console.error('Error clearing email:', error);
//   }
// };

// async function loginWithCalendly() {
//   const result = await WebBrowser.openAuthSessionAsync(
//     'https://calendly.com/oauth/authorize?client_id=DHTNpWLjpfDr8Ode2UPoWrDCU4JHORCWHtcvTdFkmB8&redirect_uri=https://medlynk.tech/api/oauth&response_type=code&scope=default',
//     'https://medlynk.tech/api/oauth'
//   );

//   if (result.type === 'success' && result.url) {
//     const response = await fetch(result.url);
//     const data = await response.json();
//     console.log("User email:", data.email);
//   } else {
//     console.log("Login cancelled or failed.");
//   }
// }