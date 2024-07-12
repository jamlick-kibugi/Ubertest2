import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from "react-native";
import tw from 'twrnc'
import NavOptions from "../components/navOptions";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelDistance } from "../slices/navSlice";

const data = [
    {
        id: "1",
        title: "UberX",
        multiplier: 1,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1682350380/assets/2f/29d010-64eb-47ac-b6bb-97503a838259/original/UberX-%281%29.png"
    },
    {
        id: "2",
        title: "UberXL",
        multiplier: 1.25,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1688558287/assets/b9/29074f-ab5d-4459-84d4-953d75430d2a/original/UberXL.png"
    },
    {
        id: "3",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png"
    }
]

const RideOptionsCard = () => {
    const navigation:any = useNavigation();
    const [selected, setSelected] = useState<String | null>(null);
    const travelDistance = useSelector(selectTravelDistance);
    let distance:any = parseFloat(travelDistance).toFixed(2);
    let travelSpeed = 20;
    let travelTime = Number(parseFloat((distance/travelSpeed).toString()).toFixed(2));
    const days = Math.floor(travelTime/24);
    
    const timeFrac:any = (travelTime - Math.floor(travelTime)).toFixed(2)
    const hours = Math.floor(travelTime%24 || travelTime);
    const mins = Math.floor(timeFrac * 60);
    
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("NavigateCard")
                }} 
                style={tw`absolute top-1 left-5 p-3 rounded-full z-1`}
                >
                    <Icon name="chevron-left" type="fontawesome"/>
                </TouchableOpacity>
                
                <Text style={tw`text-center py-3 text-xl`}>Select a Ride - {distance}km</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item:any) => item.id}
                renderItem={({item : {id, title, multiplier, image}, item}) => (
                    <TouchableOpacity 
                    onPress={() => setSelected(id)}
                    style={tw`flex-row items-center justify-between pr-6 pl-2 ${id === selected ? "bg-gray-200" : ""}`}>
                        <Image
                            style={{
                                width: 95,
                                height: 95,
                                resizeMode: "contain"
                            }}
                            source={{uri: image}}
                        />
                        <View style={tw`-ml-3`}>
                            <Text style={tw`text-xl font-montserrat`}>{title}</Text>
                            <Text>{ days ? days + " days" : ""} { hours ? hours + " hours" : ""} {days ? "" : mins + " mins"} Travel time</Text>
                        </View>
                        <Text style={tw`text-xl`}>₹{(parseFloat(((299+distance*9.5)*Number(item.multiplier)).toString()).toFixed(2))}</Text>
                    </TouchableOpacity>
                )}
            />

            <View>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 mx-3 ${!selected ? "bg-gray-300" : ""}`}>
                    <Text style={tw`text-center text-white text-xl font-montserrat`}>Choose {selected && data[Number(selected)-1].title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    );
};

export default RideOptionsCard