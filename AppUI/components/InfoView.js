import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const InfoView = () => {
  const patientInfo = {
    name: 'Boenjamin, Jason',
    dob: '05/10/2003',
    age: 21,
    sex: 'Male',
    patientId: '114851017',
    specimenId: '248-494-8275-0',
    accountNumber: '04297440',
    physician: 'L TRAN',
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={70} style={styles.infoBox}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          
          <Text style={styles.nameText}>{patientInfo.name}</Text>

          <Text style={styles.label}>
            Patient ID: <Text style={styles.bold}>{patientInfo.patientId}</Text>
          </Text>

          <Text style={styles.label}>
            Specimen ID: <Text style={styles.bold}>{patientInfo.specimenId}</Text>
          </Text>

          <Text style={styles.label}>
            DOB: <Text style={styles.bold}>{patientInfo.dob}</Text>
          </Text>

          <Text style={styles.label}>
            Age: <Text style={styles.bold}>{patientInfo.age}</Text>
          </Text>

          <Text style={styles.label}>
            Sex: <Text style={styles.bold}>{patientInfo.sex}</Text>
          </Text>

          {/* <Text style={styles.sectionTitle}>Patient Report</Text> */}

          <Text style={styles.label}>
            Account Number: <Text style={styles.bold}>{patientInfo.accountNumber}</Text>
          </Text>

          <Text style={styles.label}>
            Ordering Physician: <Text style={styles.bold}>{patientInfo.physician}</Text>
          </Text>

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    padding: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default InfoView;
