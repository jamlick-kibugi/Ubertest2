import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from 'twrnc'
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelDistance } from "../slices/navSlice";


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    
    const dispatch = useDispatch();
    let lat = Number(origin.latitude);
    let lon = Number(origin.longitude);


    let latd = destination && Number(destination.latitude);
    let lond = destination && Number(destination.longitude);
    
    
    useEffect(() => {
        if (!origin || !destination)
            return;
        lat = lat * Math.PI / 180;
        latd = latd * Math.PI / 180;
        lon = lon * Math.PI / 180;
        lond = lond * Math.PI / 180;
        
        let dlon = Math.abs(lon-lond);
        let dlat = Math.abs(lat-latd);

        let a = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat)*Math.cos(latd)*Math.pow(Math.sin(dlon/2),2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 6371
        const distance = (c*r).toString();
        dispatch(setTravelDistance(distance))
        
    }, [origin, destination])

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
        {destination && <Polyline
        coordinates={[{
            latitude: lat,
            longitude: lon,
        },
        {
            latitude: Number(destination.latitude),
            longitude: Number(destination.longitude),
        },
    ]
    
}
        geodesic = {true}
        />}
    </MapView>
    );
};

export default Map