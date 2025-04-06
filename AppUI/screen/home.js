import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import TopNavButtons from '../components/TopNavButtons';
import InfoView from '../components/InfoView'; 
import CallBotButton from '../components/CallBotButton';
import RecordsView from '../components/RecordsView';
import AppointmentsView from '../components/AppointmentsView'; 
import TranscriptsView from '../components/TranscriptsView';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import ChatLog from '../components/ChatLog';
import { fetchParsedPdfs } from '../backend';

export default function Home() {
  const [activeTab, setActiveTab] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [parsedPdfs, setParsedPdfs] = useState(null);
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
  } = useVoiceRecognition();

  useEffect(() => {
    const loadPdfs = async () => {
      try {
        const userEmail = 'jasonboe510@gmail.com';
        console.log('Fetching PDFs for:', userEmail);
        const result = await fetchParsedPdfs(userEmail);
        console.log('Fetched PDFs:', result);
        setParsedPdfs(result);
      } catch (error) {
        console.error('Error loading PDFs:', error);
      }
    };

    loadPdfs();
  }, []);
  

  const handleTabPress = (tabId) => {
    if (isRecording) {
      setIsRecording(false); 
    }
    setActiveTab(tabId);

  };

  const handleBotPress = () => {
    if (activeTab !== null) {
      setActiveTab(null);
      setIsRecording(false);
      stopListening();
    } else {
      const next = !isRecording;
      setIsRecording(next);
      console.log(next ? 'Recording started' : 'Recording stopped');

      next ? startListening() : stopListening();
    }
  };

  

  const renderMainContent = () => {
    switch (activeTab) {
      case 'info':
        return <InfoView />;
      case 'records':
        return <RecordsView />;
      case 'apt':
        return <AppointmentsView />;
      case 'transcripts':
        return <TranscriptsView />;
        default:
          return (
            (isRecording || activeTab === null) && (
              <ChatLog 
                transcript={transcript}
                isListening={isListening}
              />
            )
          );
      }
    };
  

  return (
    <LinearGradient
      colors={['#87CEFA', '#4682B4']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>MedLynk</Text>

        <TopNavButtons 
          activeTab={activeTab} 
          onTabPress={handleTabPress} 
        />

        {renderMainContent()}
        
      <CallBotButton onPress={handleBotPress} isRecording={isRecording} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20, // can be changed later if needed
  },
  transcriptContainer: {
    flex: 1,
    margin: 16,
    marginTop: 20,
  },
  transcriptBox: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  placeholderText: {
    color: '#666',
    padding: 16,
  },
});
