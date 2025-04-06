import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Login from './screen/login'
import Main from './screen/home'
import Signup from './screen/signup';
import PDFViewer from './components/PDFViewer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Signup" component={Signup} /> */}
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="PDFViewer" component={PDFViewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
