import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import TopNavButtons from '../components/TopNavButtons';
import InfoView from '../components/InfoView'; 
import CallBotButton from '../components/CallBotButton';

export default function Home() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
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

        {activeTab === 'info' ? (
          <InfoView />
        ) : (
          <View style={styles.transcriptContainer}>
            {/* <Text style={styles.transcriptLabel}>Transcript</Text> */}
            <BlurView intensity={70} style={styles.transcriptBox}>
              <Text style={styles.placeholderText}>Your conversation will appear here...</Text>
            </BlurView>
          </View>
        )}

        <CallBotButton onPress={(recording) => {
          if (recording) {
            console.log("Recording started");
            // TODO: Start react-native-voice or speech logic here
          } else {
            console.log("Recording stopped");
            // TODO: Stop voice recording and send to Gemini
          }
        }} />
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
