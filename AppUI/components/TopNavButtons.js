import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TopNavButtons = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'records', label: 'Records' },
    { id: 'past', label: 'Transcipts' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'info', label: 'Info' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[activeTab === tab.id && styles.activeButton]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text 
            style={[styles.buttonText, activeTab === tab.id && styles.activeButtonText]}
            numberOfLines={1}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  activeButton: {
    backgroundColor: 'transparent',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default TopNavButtons;
