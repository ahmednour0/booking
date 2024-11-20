import { StyleSheet, Text, View ,Pressable} from 'react-native'
import React ,{useLayoutEffect} from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

const BookingScreen = () => {
  const bookings = useSelector((state) => state.booking.booking);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
    {bookings.length > 0 ? (
      bookings.map((item, index) => (
        <Pressable
          key={index}
          style={{
            backgroundColor: "white",
            marginVertical: 10,
            marginHorizontal: 20,
            borderColor: "#E0E0E0",
            borderWidth: 1,
            padding: 14,
            borderRadius: 6,
          }}
        >
          <View>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 7,
              }}
            >
              <MaterialIcons name="stars" size={24} color="green" />
              <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
                {item.rating}
              </Text>
              <Text style={{ marginLeft: 3 }}>•</Text>
              <View
                style={{
                  padding: 6,
                  width: 100,
                  backgroundColor: "#0039a6",
                  marginLeft: 4,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 13,
                    fontWeight: "400",
                  }}
                >
                  Genius Level
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      ))
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          paddingHorizontal: 20,
        }}
      >
        <MaterialIcons name="error-outline" size={64} color="gray" />
        <Text
          style={{
            fontSize: 20,
            color: "#333",
            fontWeight: "bold",
            marginVertical: 10,
            textAlign: "center",
          }}
        >
          No Bookings Available
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            textAlign: "center",
          }}
        >
          Check back later for updates or add some bookings to get started.
        </Text>
      </View>
    )}
  </SafeAreaView>
  
  )
}

export default BookingScreen

const styles = StyleSheet.create({})