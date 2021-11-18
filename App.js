import React from "react";

import {View,Text,StyleSheet} from 'react-native';
import MapScreen from "./Componenets/MapScreen";
import Geolocation from '@react-native-community/geolocation';

const App =()=>{
 // Geolocation.getCurrentPosition(data=>(console.log(data)));
return(
    <MapScreen/>
)
}

const styles=StyleSheet.create({});

export default App;