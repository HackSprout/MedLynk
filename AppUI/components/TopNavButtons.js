import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TopNavButtons = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'records', label: 'Records' },
    { id: 'apt', label: 'Appointments' },
    { id: 'info', label: 'Info' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[activeTab === tab.id ? styles.activeButton : styles.inactiveButton]}
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
    padding: 25,
    alignItems: 'center',
    overflow: 'hidden',
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: 'transparent',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default TopNavButtons;
