import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        const allowedDomains = [
            'gmail.com', 'yahoo.com', 'outlook.com',
            'hotmail.com', 'icloud.com', 'aol.com',
            'protonmail.com', 'zoho.com', 'gmx.com',
            'yandex.com', 'mail.com'
        ];
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
        } else if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
        } else {
            const emailDomain = email.split('@')[1];
            if (!allowedDomains.includes(emailDomain)) {
                Alert.alert('Invalid Domain', 'Please use a supported email provider');
            } else {
                navigation.navigate('Home');
            }
        }
    };
         

    return (
        <LinearGradient
            colors={['#B3E5FC', '#FFE0B2']}
            style={styles.container}
        >
            <BlurView intensity={20} style={styles.loginBox}>
                <Text style={styles.title}>Login</Text>

                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor="#666"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#666"
                    />
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity 
                        style={styles.checkboxContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                            {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
                        </View>
                        <Text style={styles.checkboxLabel}>Remember me</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerContainer}
                onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.registerText}>Don't have an account? Register</Text>
                </TouchableOpacity>
            </BlurView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBox: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        overflow: 'hidden',
    },
    title: {
        fontSize: 32,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#666',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,   
        borderColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 12,
        color: '#333',
        fontSize: 16,
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#666',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    checkboxLabel: {
        color: '#666',
        fontSize: 14,
    },
    forgotPassword: {
        color: '#666',
        fontSize: 14,
    },
    loginButton: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    registerContainer: {
        marginTop: 'auto',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
});
