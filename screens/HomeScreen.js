import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Image,
  Alert,
  Platform,

} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/Header.js";
import Feather from "@expo/vector-icons/Feather";
import {
  ModalFooter,
  ModalButton,
  ModalTitle,
  ModalContent,
  SlideAnimation,
  BottomModal,
} from "react-native-modals";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'; // Make sure to import format from date-fns

const HomeScreen = () => {
  const [range1, setRange1] = useState(''); // Date range text
  const [range2, setRange2] = useState(''); // Date range text
  const [Date1, setDate1] = useState(''); // Date range text
  const [Date2, setDate2] = useState(''); // Date range text
  const [startDate, setStartDate] = useState(null); // Start date
  const [endDate, setEndDate] = useState(null); // End date
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [pickerMode, setPickerMode] = useState('start'); // 'start' or 'end'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setselectedDate] = useState("");

  const handleDateChange = (event, selectedDate) => {
    setDate1(selectedDate)
      setStartDate(selectedDate || currentDate);
   
      setShowPicker(false); // Close the picker

      // Update the displayed range text in the format "Month Day, Year"
      const formattedRangee = `${format(startDate, 'yyyy/MM/dd')} - ${format(selectedDate, 'yyyy/MM/dd')}`;
      const formattedRange1 = `${formatDate(selectedDate)}`;


      setRange1(formattedRange1);
   
      setselectedDate(prevSelectedDate => ({
        ...prevSelectedDate,
        startDate: format(selectedDate, 'yyyy/MM/dd'),
      }));
    
    
    
  };
  const handleDateChangee = (event, selectedDate) => {
    setDate2(selectedDate)
      setEndDate(selectedDate || currentDate);
      setShowPicker2(false); // Close the picker

      // Update the displayed range text in the format "Month Day, Year"
      const formattedRangee = `${format(startDate, 'yyyy/MM/dd')} - ${format(selectedDate, 'yyyy/MM/dd')}`;
      const formattedRange2 = `${formatDate(selectedDate)}`;

      setRange2(formattedRange2);
      setselectedDate(prevSelectedDate => ({
        ...prevSelectedDate,
        endDate: format(selectedDate, 'yyyy/MM/dd'), // assuming `selectedDate` contains the end date here
      }));
    
    
    
  };



  // Helper function to format the date as "Month Day, Year" (e.g., "November 21, 2024")
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  const navigation = useNavigation();
  const route = useRoute();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    if (isDropdownVisible === true) {
      setDropdownVisible(false);
    } else if (isDropdownVisible === false) {
      setDropdownVisible(true);
    }
  };

  const [rooms, setrooms] = useState(1);
  const [adults, setadults] = useState(2);
  const [children, setchildren] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        shadowColor: "transparent",
      },
      headerTitleAlign: "center",
      headerRight: () => (
        <View style={styles.container}>
          <Pressable onPress={toggleDropdown}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
          </Pressable>

         
        </View>
      ),
    });
  }, [isDropdownVisible]);
  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
         width: "100%", padding: 10, marginHorizontal: "3%" ,
        }}
        title="Apply"
        titleStyle={{
          fontSize: 50, // Set font size
          fontWeight: 'bold', // Set font weight if needed
        }}
        primary
      />
    );
  };
  const searchPlaces = (place) => {
    if (!route.params || !selectedDate || !selectedDate.startDate || !selectedDate.endDate) {
      Alert.alert(
        "Invalid Details",
        "Please enter all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else if (new Date(selectedDate.endDate) < new Date(selectedDate.startDate)) {
      Alert.alert(
        "Invalid Date Range",
        "End date cannot be before start date",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      // If validation passes, proceed to navigate
      navigation.navigate("Places", {
        rooms: rooms,
        adults: adults,
        children: children,
        selectedDates: selectedDate, // This contains both startDate and endDate
        place: place,
      });
    }
  };
  
  

  return (
    <>
      <View>
      <StatusBar style="light" />

        {/* <Header /> */}
        {isDropdownVisible && (
            <View style={styles.dropdown}>
              <Text style={styles.dropdownItem}>No Notifications</Text>
          
            </View>
          )}
        <ScrollView>
          <View
            style={{
              margin: 20,
              borderColor: "#ffc72c",
              borderWidth: 3,
              borderRadius: 6,
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#ffc72c",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                onPress={() => navigation.navigate("Search")}
                placeholder={
                  route?.params ? route.params.input : "Enter Your Destination"
                }
              />
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,

                borderColor: "#ffc72c",
                borderWidth: 2,
                paddingVertical: 15,
              }}
              onPress={() => {
          setShowPicker(true);
        }}
            >
              <Feather name="calendar" size={24} color="black" />
              {/* <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerMarkTitle: {
                    display: "none",
                  },

                  headerStyle: {
                    backgroundColor: "#003580",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) =>
                  setselectedDate(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder="Select Your Date"
                mode={"range"} // Assuming you want to select a range of dates
                headerText="Custom Header"
              /> */}


      {/* Start date input */}
 
        <TextInput
          style={styles.input}
          value={range1 ? range1 : ''}
          placeholder="Select Start Date"
          placeholderTextColor="#999"
          editable={false} // Prevent manual input
        />
  

      {/* End date input */}
   

      {/* DateTimePicker */}
      {showPicker && (
        <DateTimePicker
          value={    Date1?Date1:currentDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()} // Disable all past dates

        />
      )}

            </Pressable>







            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#ffc72c",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="calendar" size={24} color="black" />
            


              <Pressable
        onPress={() => {
          setShowPicker2(true);
        }}
      >
        <TextInput
          style={styles.input}
          value={range2 ? range2 : ''}
          placeholder="Select End Date"
          placeholderTextColor="#999"
          editable={false} // Prevent manual input
        />
        {/* DateTimePicker */}
      {showPicker2 && (
        <DateTimePicker
          value={Date2?Date2:new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChangee}
          minimumDate={Date1?Date1:new Date()} // Disable all past dates

        />
      )}
      </Pressable>

            </Pressable>



            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#ffc72c",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                onPress={() => setModalVisible(!modalVisible)}
                editable={false} //
                placeholderTextColor="red"
                placeholder={`${rooms} Rooms • ${adults} Adults • ${children} Children`}
              />
            </Pressable>

            <Pressable
              onPress={() => searchPlaces(route?.params?.input)}
              style={{
                paddingHorizontal: 10,
                borderColor: "#ffc72c",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#2a52be",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
          <Text
            style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}
          >
            Travel More spend less
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#003580",
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Genius
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                You are ate genius level one in loyalty program
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#e0e0e0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                15% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Complete 5 stays to unlock level 2
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#e0e0e0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                10% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Enjoy Discounts at participating at properties worldwide
              </Text>
            </Pressable>
          </ScrollView>
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
        </ScrollView>
      </View>
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                padding: 10,
                backgroundColor: "#003580", // Button background color
                borderRadius: 5,
              }}
              textStyle={{
                color: "white", // Apply white text color
              }}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select Rooms and Guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text>Rooms</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setrooms(Math.max(1, rooms - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>{rooms}</Text>
              </Pressable>

              <Pressable
                onPress={() => setrooms((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text>Adults</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setadults(Math.max(1, adults - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {adults}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setadults((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text>Children</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setchildren(Math.max(1, children - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {children}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setchildren((c) => c + 1)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({

  overlayContainer: {
    position: "absolute",
    top: 60, // Position the overlay below the header
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Add a semi-transparent background to dim the rest of the screen
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100, // Ensure the dropdown is above other content
  },
  dropdown: {
    position: "absolute",
    top: 0, // Adjust the position of the dropdown
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    width: 160,
    padding: 10,
    elevation: 3, // Add shadow effect for better visibility
    zIndex: 101, // Ensure it stays on top
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputWrapper: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '##ccc',
    color: '#333',
  },
});

export default HomeScreen;