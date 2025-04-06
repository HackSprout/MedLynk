import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { BlurView } from 'expo-blur';
import { getAppointments, getEmailFromCache, getSchedLink } from '../backend';

const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduling, setScheduling] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const email = await getEmailFromCache();
      if (!email) {
        setError('Please log in to view appointments');
        return;
      }

      const result = await getAppointments(email);
      if (result.error) {
        setError(result.error);
      } else {
        setAppointments(result);
      }
    } catch (err) {
      setError('Failed to load appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    try {
      setScheduling(true);
      const userEmail = await getEmailFromCache();
      if (!userEmail) {
        setError('Please log in to schedule appointments');
        return;
      }

      // For demo, using a fixed doctor email. In production, this would come from doctor selection
      const doctorEmail = 'falaktulsi@gmail.com';
      const result = await getSchedLink(userEmail, doctorEmail);
      
      if (result.reply) {
        await Linking.openURL(result.reply);
        // Reload appointments after a short delay to show new appointment
        setTimeout(loadAppointments, 5000);
      } else {
        setError('Could not get scheduling link');
      }
    } catch (err) {
      setError('Failed to schedule appointment');
      console.error(err);
    } finally {
      setScheduling(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={70} style={styles.infoBox}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity 
            style={styles.scheduleButton} 
            onPress={handleSchedule}
            disabled={scheduling}
          >
            {scheduling ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.scheduleButtonText}>Schedule New Appointment</Text>
            )}
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator style={styles.loading} color="#666" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : appointments.length === 0 ? (
            <Text style={styles.placeholderText}>No appointments scheduled</Text>
          ) : (
            appointments.map((apt, index) => (
              <View key={index} style={styles.appointmentCard}>
                <Text style={styles.appointmentTitle}>{apt.title || 'Appointment'}</Text>
                <Text style={styles.appointmentTime}>{formatDate(apt.start_time)}</Text>
                {apt.description && (
                  <Text style={styles.appointmentDesc}>{apt.description}</Text>
                )}
              </View>
            ))
          )}
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
    padding: 16,
  },
  scheduleButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  appointmentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  appointmentTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  appointmentDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  placeholderText: {
    color: '#666',
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  loading: {
    padding: 20,
  },
});

export default AppointmentsView;
