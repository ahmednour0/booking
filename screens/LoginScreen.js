import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const login = () => {
    setLoading(true); // Start loading
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User details", user);

        // After successful login, navigate to the "Main" screen
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert(
          "Authentication Failed",
          "Invalid email or password. Please try again.",
          [{ text: "OK", style: "cancel" }]
        );
        console.log("Error", error.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        // If user is logged in, navigate to the "Main" screen
        const user = auth.currentUser;
        if (user) {
          navigation.replace("Main");
        }
      } catch (e) {
        console.error("Failed to check user", e);
      }
    };

    checkUser();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <StatusBar style="dark" />

      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Sign In
          </Text>

          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter Your Email"
              placeholderTextColor={"black"}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            >
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword} // Toggle visibility
                placeholder="Password"
                placeholderTextColor={"black"}
                style={{
                  fontSize: 18,
                  flex: 1, // Take up available space
                }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"} // Change icon
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Pressable
          onPress={login}
          style={{
            width: 200,
            backgroundColor: "#003580",
            padding: 15,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
            opacity: loading ? 0.7 : 1, // Dim the button when loading
          }}
          disabled={loading} // Disable the button when loading
        >
          {loading ? (
            <ActivityIndicator color="white" /> // Show loader while loading
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
      <Pressable
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 200, height: 50, resizeMode: "cover" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
          }}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
