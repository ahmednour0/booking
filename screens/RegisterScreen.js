import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Pressable, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Import icon

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [emailError, setEmailError] = useState(""); // Email validation error
    const [passwordError, setPasswordError] = useState(""); // Password validation error
    const [phoneError, setPhoneError] = useState(""); // Phone number validation error

    const navigation = useNavigation();

    const register = () => {
        setLoading(true);
        let isValid = true;

        // Email Validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(""); // Clear error if valid
        }

        // Password Validation
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            isValid = false;
        } else {
            setPasswordError(""); // Clear error if valid
        }

        // Phone Number Validation (10 digits)
        const phonePattern = /^[0-9]{11}$/;
        if (!phonePattern.test(phone)) {
            setPhoneError("Please enter a valid 11-digit phone number.");
            isValid = false;
        } else {
            setPhoneError(""); // Clear error if valid
        }

        // If any validation fails, stop the registration
        if (!isValid) {
            setLoading(false);
            return;
        }

        // Register the user
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials._tokenResponse.email;
                const uid = auth.currentUser.uid;

                setDoc(doc(db, "users", `${uid}`), {
                    email: user,
                    phone: phone
                });
                navigation.navigate("Login");
                Alert.alert("Registration Successful");
            })
            .catch((error) => {
                Alert.alert('Registration Failed', 'Registration failed. Please try again.');
            });

        setLoading(false);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "white",
            padding: 10,
            alignItems: "center",
        }}>
            <StatusBar style='dark' />

            <KeyboardAvoidingView>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 100,
                }}>
                    <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
                        Register
                    </Text>

                    <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
                        Create an Account
                    </Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    {/* Email Input */}
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Email
                        </Text>

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Enter Your Email"
                            placeholderTextColor={"black"}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{
                                fontSize: 18,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }}
                        />
                        {emailError ? (
                            <Text style={{ color: "red", fontSize: 14 }}>{emailError}</Text>
                        ) : null}
                    </View>

                    {/* Password Input */}
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Password
                        </Text>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            width: 300,
                        }}>
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!showPassword} // Toggle visibility
                                placeholder="Enter Password"
                                placeholderTextColor={"black"}
                                style={{
                                    fontSize: 18,
                                    flex: 1,
                                }}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <MaterialIcons
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    size={24}
                                    color="gray"
                                />
                            </Pressable>
                        </View>
                        {passwordError ? (
                            <Text style={{ color: "red", fontSize: 14 }}>{passwordError}</Text>
                        ) : null}
                    </View>

                    {/* Phone Input */}
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                            Phone
                        </Text>

                        <TextInput
                            value={phone}
                            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))} // Allow only numeric input
                            placeholder="Enter Your Phone No"
                            placeholderTextColor={"black"}
                            keyboardType="numeric"
                            maxLength={11} // Limit input to 10 digits
                            style={{
                                fontSize: 18,
                                borderBottomColor: "gray",
                                borderBottomWidth: 1,
                                marginVertical: 10,
                                width: 300,
                            }}
                        />
                        {phoneError ? (
                            <Text style={{ color: "red", fontSize: 14 }}>{phoneError}</Text>
                        ) : null}
                    </View>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#003580" style={{ marginTop: 50 }} />
                ) : (
                    <Pressable
                        onPress={register}
                        style={{
                            width: 200,
                            backgroundColor: '#003580',
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 50,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                            Register
                        </Text>
                    </Pressable>
                )}

                <Pressable style={{
                    marginTop: 40,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Image
                        style={{ width: 200, height: 50, resizeMode: "cover" }}
                        source={{
                            uri: "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
                        }}
                    />
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>Already have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({});
