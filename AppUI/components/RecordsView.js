import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const RecordsView = () => {
  const navigation = useNavigation();

  const pdfs = [
    { name: '2024_jasonboenjamin_std.pdf', path: require('../assets/docs/2024_jasonboenjamin_std.pdf') },
    { name: '2024_jasonboenjamin_vitD.pdf', path: require('../assets/docs/2024_jasonboenjamin_vitD.pdf') },
    { name: '2024_ovrreport_jasonboenjamin.pdf', path: require('../assets/docs/2024_ovrreport_jasonboenjamin.pdf') },
  ];

  const openPDF = (pdf) => {
    navigation.navigate('PDFViewer', { pdf });
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={70} style={styles.recordBox}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Your Medical Records</Text>
          {pdfs.map((pdf, index) => (
            <TouchableOpacity key={index} onPress={() => openPDF(pdf)}>
              <Text style={styles.recordText}>{pdf.name}</Text>
            </TouchableOpacity>
          ))}
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
  recordBox: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  scrollContent: {
    padding: 55,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  recordText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 12,
    textDecorationLine: 'underline'
  },
  
});

export default RecordsView;
