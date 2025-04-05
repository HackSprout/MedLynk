import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Login from './screen/login';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Login />
      <StatusBar style="light" backgroundColor="#000" />
    </SafeAreaView>
  );
}
