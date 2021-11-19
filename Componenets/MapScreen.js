import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, PermissionsAndroid, } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import CustomButton from './CustomButton';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MapDb',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);


export default function MapScreen({ navigation }) {
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    useEffect(() => {
        createTable();

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
        getLocation();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Location "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL);"
            )
        })
    }

    const setData = () => {
        // navigation.navigate('Home');
        //
        //getLocation();
        setInterval(() => getLocation(), 300000)
        navigation.navigate('Home');
    }
    const getLocation = async () => {

        try {

            Geolocation.getCurrentPosition((pos) => {
                const crd = pos.coords;
                setPosition({
                    latitude: crd.latitude,
                    longitude: crd.longitude,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0421,
                });
            })
            await db.transaction(async (tx) => {

                await tx.executeSql(
                    "INSERT INTO Location (latitude, longitude) VALUES (?,?)",
                    [position.latitude, position.longitude]
                );
            })
            //  navigation.navigate('Home');

        } catch (error) {
            console.log(error);
        }


    }
    return (
        <View style={styles.container}>
            
            <MapView
                style={styles.map}
                initialRegion={position}
                showsUserLocation={true}
            >
                <Marker coordinate={position} />
            </MapView>
            <CustomButton
                title='Dashboard'
                color='#0080ff'
                onPressFunction={setData} />

            <Text style={styles.text}>Current latitude: {position.latitude}</Text>
            <Text style={styles.text}>Current longitude: {position.longitude}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, 
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});