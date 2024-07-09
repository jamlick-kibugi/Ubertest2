import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from 'twrnc'
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    
    let lat = Number(origin.latitude)
    let lon = Number(origin.longitude)

    return (
    <MapView
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}>

        <Marker
            coordinate={{
                latitude: lat,
                longitude: lon,
            }}
        />
        
    </MapView>
    );
};

export default Map