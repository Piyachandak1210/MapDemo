import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View , PermissionsAndroid,} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';

export default function MapScreen() {
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords;
          setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        }).catch((err) => {
          console.log(err);
        });
      }, []);
  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={position}
        showsUserLocation={true}
      >
           <Marker coordinate={position} />
          </MapView>
      <Text style={styles.text}>Current latitude: {position.latitude}</Text>
    <Text style={styles.text}>Current longitude: {position.longitude}</Text>
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});