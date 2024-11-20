import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import SaveScreen from "./screens/SaveScreen";
import BookingScreen from "./screens/BookingScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import PlacesScreen from "./screens/PlacesScreen";
import MapScreen from "./screens/MapScreen";
import PropertyInfoScreen from "./screens/PropertyInfoScreen";
import RoomsScreen from "./screens/RoomsScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import UserScreen from "./screens/UserScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function ButtonTabs(params) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />


<Tab.Screen
          name="Saved"
          component={SaveScreen}
          options={{
            tabBarLabel: "Favorites",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
<AntDesign name="heart" size={24} color="#003580" />
              ) : (
<AntDesign name="hearto" size={24} color="black" />              ),
          }}
        />



<Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarLabel: "Bookings",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
<Ionicons name="notifications" size={24} color="#003580" />              ) : (
    <Ionicons name="notifications-outline" size={24} color="black" />         ),
          }}
        />


<Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
<Ionicons name="person" size={24} color="#003580" />          ) : (
    <Ionicons name="person-outline" size={24} color="black" />      ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (<NavigationContainer>
    <Stack.Navigator >
    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
      <Stack.Screen
        name="Main"
        component={ButtonTabs}
options={{headerShown: false}}
      />
         <Stack.Screen
        name="Search"
        component={SearchScreen}
options={{headerShown: false}}
      />


<Stack.Screen
        name="Places"
        component={PlacesScreen}
      />
    
    <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="Info"
        component={PropertyInfoScreen}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="Rooms"
        component={RoomsScreen}
      />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  </NavigationContainer>)
};

const styles = StyleSheet.create({});

export default StackNavigator;
