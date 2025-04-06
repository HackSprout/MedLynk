import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const TransciptsView = () => {

  return (
    <View style={styles.container}>
      <BlurView intensity={70} style={styles.infoBox}>
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.placeholderText}>Show list of Transcripts</Text>
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
  },
  placeholderText: {
    color: '#666',
    padding: 16,
  },
});

export default TransciptsView;
