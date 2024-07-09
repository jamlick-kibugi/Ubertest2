import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from "react-native";
import tw from 'twrnc'

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_558,h_372/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png",
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order food",
        image: "https://e7.pngegg.com/pngimages/424/789/png-clipart-hamburger-junk-food-fast-food-hamburger-french-fries-pizza-junk-food-s-food-recipe.png",
        screen: "EatsScreen"
    },
];

const NavOptions = () => {
        const navigation: any = useNavigation();

        return <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-2 pl-4 pb-8 bg-gray-100 m-2 w-38`}
                >
                    <View>
                        <Image
                        style={{width: 120, height: 120, resizeMode: "contain"}}
                        source={{uri: item.image}}
                        />
                        <Text style={tw`mt-2 text-lg pl-5 font-semibold`}>{item.title}</Text>
                        <Icon 
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name="arrowright" color="white" type="antdesign" />
                    </View>
                </TouchableOpacity>
            )}
        />
    
};

export default NavOptions