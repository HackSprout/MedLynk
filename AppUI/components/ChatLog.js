import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { requestGemini } from '../backend';

const ChatLog = ({ transcript, isListening }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const lastProcessedTranscript = useRef('');

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const handleNewUserMessage = async () => {
      if (transcript && !isListening && transcript !== lastProcessedTranscript.current) {
        lastProcessedTranscript.current = transcript;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setMessages(prev => [...prev, { text: transcript, isUser: true, time: timestamp }]);
        
        setIsLoading(true);
        try {
          console.log('Sending to Gemini:', transcript);
          const response = await requestGemini(transcript);
          console.log('Got response from Gemini:', response);
          
          if (!response || !response.reply) {
            throw new Error('No reply from Gemini');
          }
          
          setMessages(prev => [...prev, { 
            text: response.reply,
            isUser: false, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        } catch (error) {
          console.error('Error getting Gemini response:', error);
          setMessages(prev => [...prev, { 
            text: 'Sorry, I encountered an error. Please try again.', 
            isUser: false, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleNewUserMessage();
  }, [transcript, isListening]);

  const renderMessage = (message, index) => (
    <View 
      key={index} 
      style={[styles.messageContainer, message.isUser ? styles.userMessage : styles.botMessage]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.timeText}>{message.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BlurView intensity={70} style={styles.infoBox}>
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollView}
        >
          {messages.length === 0 ? (
            <Text style={styles.placeholderText}>Start speaking to begin the conversation...</Text>
          ) : (
            messages.map(renderMessage)
          )}
          {isLoading && (
            <ActivityIndicator style={styles.loading} color="#666" />
          )}
        </ScrollView>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  infoBox: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  scrollView: {
    padding: 10,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 'auto',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginRight: 'auto',
  },
  messageText: {
    color: '#333',
    fontSize: 16,
  },
  timeText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  placeholderText: {
    color: '#666',
    padding: 16,
    textAlign: 'center',
  },
  loading: {
    marginTop: 10,
  },
});

export default ChatLog;
