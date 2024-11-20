import React, { useLayoutEffect } from 'react';
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from "react-native";
 import { AntDesign } from "@expo/vector-icons";
 import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from '../favoriteReducer';
import { useNavigation } from '@react-navigation/native';
const SaveScreen = () => {
    const { width, height } = Dimensions.get("window");

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Favorites",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerTitleAlign: "center",
    });
  }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => {
            const { property, adults, children, rooms, selectedDates } = favorite;
  
            return (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("Info", {
                    name: property.name,
                    rating: property.rating,
                    oldPrice: property.oldPrice,
                    newPrice: property.newPrice,
                    photos: property.photos,
                    availableRooms: property.rooms,
                    adults: adults,
                    children: children,
                    rooms: rooms,
                    selectedDates: selectedDates,
                  })
                }
                style={styles.pressable}
              >
                <View>
                  <Image
                    style={{ height: height / 3, width: width - 280 }}
                    source={{ uri: property.image }}
                  />
                </View>
  
                <View style={{ padding: 10 }}>
                  <View style={styles.titleRow}>
                    <Text style={{ width: 200 }}>{property.name}</Text>
                    <Pressable onPress={() => dispatch(toggleFavorite(favorite))}>
                    <AntDesign name="heart" size={24} color="red" />
                    </Pressable>
                  </View>
  
                  <View style={styles.ratingRow}>
                    <MaterialIcons name="stars" size={24} color="green" />
                    <Text>{property.rating}</Text>
                    <View style={styles.geniusBadge}>
                      <Text style={styles.geniusText}>Genius Level</Text>
                    </View>
                  </View>
  
                  <Text style={styles.address}>
                    {property.address.length > 50
                      ? property.address.substr(0, 50) + "..."
                      : property.address}
                  </Text>
  
                  <Text style={styles.priceLabel}>
                    Price for 1 Night and {adults} adults
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.oldPrice}>
                      Rs {property.oldPrice * adults}
                    </Text>
                    <Text style={styles.newPrice}>
                      Rs {property.newPrice * adults}
                    </Text>
                  </View>
  
                  <View style={{ marginTop: 6 }}>
                    <Text style={styles.roomInfo}>Deluxe Room</Text>
                    <Text style={styles.roomInfo}>Hotel Room : 1 bed</Text>
                  </View>
  
                  <View style={styles.dealBadge}>
                    <Text style={styles.dealText}>Limited Time Deal</Text>
                  </View>
                </View>
              </Pressable>
            );
          })
        ) : (
          <View style={styles.noFavorites}>
            <Text style={styles.noFavoritesText}>No Favorites Yet</Text>
          </View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    pressable: {
      margin: 15,
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: 8,
      overflow: "hidden",
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 7,
    },
    geniusBadge: {
      backgroundColor: "#6CB4EE",
      paddingVertical: 3,
      borderRadius: 5,
      width: 100,
    },
    geniusText: {
      textAlign: "center",
      color: "white",
      fontSize: 15,
    },
    address: {
      width: 210,
      marginTop: 6,
      color: "gray",
      fontWeight: "bold",
    },
    priceLabel: {
      marginTop: 4,
      fontSize: 15,
      fontWeight: "500",
    },
    priceRow: {
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    oldPrice: {
      color: "red",
      fontSize: 18,
      textDecorationLine: "line-through",
    },
    newPrice: {
      fontSize: 18,
    },
    roomInfo: {
      fontSize: 16,
      color: "gray",
    },
    dealBadge: {
      backgroundColor: "#6082B6",
      paddingVertical: 2,
      marginTop: 2,
      borderRadius: 5,
      width: 150,
      paddingHorizontal: 3,
    },
    dealText: {
      textAlign: "center",
      color: "white",
    },
    noFavorites: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    noFavoritesText: {
      fontSize: 18,
      color: "gray",
      fontWeight: "500",
    },
  });

export default SaveScreen;
