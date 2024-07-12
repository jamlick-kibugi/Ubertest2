import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from 'twrnc'
import { selectOrigin } from "../slices/navSlice";
import { setDestination, setOrigin } from "../slices/navSlice";
import RideOptionsCard from "./RideOptions";

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Park Street Area, Kolkata",
        latitude: "22.57687",
        longitude: "88.35047"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "Sector V, Bidhannagar, Kolkata",
        latitude: "22.5809",
        longitude: "88.4291"
    },
];

const NavFavourites = (props: any) => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    
        const navigation: any = useNavigation();

        return (<FlatList
            data={data}
            keyExtractor = {(item) => item.id}
            renderItem = {({item : {location, destination, icon, latitude, longitude}}) => (
                <TouchableOpacity style={tw`flex-row items-center p-3`}
                    onPress={() => {
                        if (props.screen == "homescreen")
                            {dispatch(setOrigin({
                                latitude: latitude,
                                longitude: longitude,
                                description: destination,
                            }))
                            navigation.navigate("MapScreen")
                        }
                        else
                        {dispatch(setDestination({
                            latitude: latitude,
                            longitude: longitude,
                            description: destination
                        }))
                        navigation.navigate("RideOptionsCard")
                    }
                    } }
                >
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
        )}  
        />)
    
};

export default NavFavourites