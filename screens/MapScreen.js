import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const route = useRoute();
  const mapView = useRef(null);

  // Extract coordinates from search results
  const coordinates = [];
  route.params.searchResults.forEach((item) =>
    item.properties?.forEach((prop) => {
      coordinates.push({
        latitude: Number(prop.latitude),
        longitude: Number(prop.longitude),
      });
    })
  );

  // Adjust map view to fit all markers
  useEffect(() => {
    if (coordinates.length > 0) {
      mapView.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 190,
          left: 190,
          bottom: 190,
          right: 190,
        },
      });
    }
  }, [coordinates]);

  return (
    <View style={{ flex: 1 }}>
      <MapView ref={mapView} style={{ width: "100%", height: "100%" }}>
        {route.params.searchResults.map((item, itemIndex) =>
          item.properties.map((property, propIndex) => (
            <Marker
              key={`marker-${itemIndex}-${propIndex}`} // Unique key combining indices
              title={property.name}
              coordinate={{
                latitude: Number(property.latitude),
                longitude: Number(property.longitude),
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#003580",
             
                  paddingHorizontal:2,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {property.newPrice}
                </Text>
              </Pressable>
            </Marker>
          ))
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
