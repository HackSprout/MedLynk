import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import TopNavButtons from '../components/TopNavButtons';
import InfoView from '../components/InfoView'; 

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

        <View style={styles.transcriptContainer}>
          <BlurView intensity={70} style={styles.transcriptBox}>
            
            <Text style={styles.placeholderText}>Example (BOT: Hello Sam Sulek! How may I help you today?)</Text>
          
          </BlurView>
        </View>

        <TouchableOpacity style={styles.callButton}>
          
          <Text style={styles.callButtonText}>Press</Text>
        
        </TouchableOpacity>
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

  callButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // takes the button to middle
    marginBottom: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
