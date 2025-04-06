import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CallBotButton({ onPress, isRecording }) {
  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity style={styles.callButton} onPress={handlePress}>
      {isRecording ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Ionicons name="pulse" size={32} color="#fff" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    callButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF4444',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 30,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
