import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import TopNavButtons from '../components/TopNavButtons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('records');

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
});
