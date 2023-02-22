import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const Location = ({ address }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 56.67766256058864,
    longitude: 12.866026466251748,
  });
  const navigation = useNavigation();

  // Här kan du hämta adressens koordinater genom att använda en API från en karttjänst
  // och uppdatera `coordinates`-tillståndet med den hämtade informationen.
  const handleSettings = () => {
    navigation.navigate("Settings");
  };
  return (
    <>
      <MapView
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 1.0922,
          longitudeDelta: 2.0421,
        }}
        style={{ width: "100%", height: "100%" }}
        userInterfaceStyle={"dark"}
        showsCompass={true}
      >
        <Ionicons
          style={{ marginTop: 30, marginLeft: 10 }}
          onPress={handleSettings}
          name="ios-arrow-back"
          size={32}
        />
        <Marker
          coordinate={selectedLocation}
          title="Min plats"
          description="Detta är din valda plats"
        />
      </MapView>
    </>
  );
};

export default Location;
