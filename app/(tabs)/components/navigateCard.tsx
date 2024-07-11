import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions, Platform } from "react-native";
import tw from 'twrnc'
import NavOptions from "../components/navOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "expo-router";
import { SearchBarAndroid } from "@rneui/base/dist/SearchBar/SearchBar-android";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import NavFavourites from "./navFavourites"
import { fonts, Icon } from "@rneui/base";
import { useFonts } from "expo-font";



const NavigateCard = () => {
    const navigation: any = useNavigation();
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false)
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)

    const dropdownController = useRef(null)    

    const searchRef = useRef(null)
    const getSuggestions = useCallback(async (q: any) => {
        const filterToken = q.toLowerCase()
        console.log('getSuggestions', q)
        if (typeof q !== 'string' || q.length < 3) {
          setSuggestionsList(null)
          return
        }
        setLoading(true)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1&lang=en`)
        const items = await response.json()
        
        const suggestions = items
          .map((item: { place_id: any; display_name: any; lat: any; lon: any; }) => ({
            id: item.place_id,
            title: item.display_name,
            lat: item.lat,
            lon: item.lon
          }))
        setSuggestionsList(suggestions)
        setLoading(false)
      }, [])
    
      const onClearPress = useCallback(() => {
        setSuggestionsList(null)
      }, [])
    
      const onOpenSuggestionsList = useCallback((isOpened: any) => {}, [])
    

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Evening, Ritesh</Text>
            <View style={tw`flex-shrink`}>
            <View style={tw`pb-5 flex flex-col justify-center items-center`}>
            <AutocompleteDropdown
                    ref={searchRef}
                    controller={(controller : any)=> {
                        dropdownController.current = controller
                      }}
                      // initialValue={'1'}
                      direction={Platform.select({ android: 'down' })}
                      dataSet={suggestionsList}
                      onChangeText={getSuggestions}
                      onSelectItem={(item:any) => {
                        item && setSelectedItem(item.title)
                        item && setLat(item.lat)
                        item && setLon(item.lon)
                        item && dispatch(setDestination({
                            latitude: item.lat,
                            longitude: item.lon,
                            description: item.title
                        }))
                        item && navigation.navigate("RideOptionsCard")
                      }}
                      debounce={600}
                      suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                      onClear={onClearPress}
                      //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                      onOpenSuggestionsList={onOpenSuggestionsList}
                      loading={loading}
                      useFilter={false} // set false to prevent rerender twice
                      textInputProps={{
                        placeholder: 'Where to mister?',
                        placeholderTextColor: '#a6a6a6',
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        style: {
                        width: 350,
                          backgroundColor: '#e0e0e0',
                          color: '#000000',
                          paddingLeft: 18,
                        },
                      }}
                      rightButtonsContainerStyle={{
                        right: 8,
                        height: 30,
            
                        alignSelf: 'center',
                      }}
                      inputContainerStyle={{
                        backgroundColor: '#e0e0e0',
                      }}
                      suggestionsListContainerStyle={{
                        backgroundColor: '#fff',
                      }}
                      containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                      renderItem={(item, text) => <Text style={{ color: '#00000', padding: 15 }}>{item.title}</Text>}
                    //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
                    //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
                      inputHeight={50}
                      showChevron={false}
                      closeOnBlur={false}
                      //  showClear={false}
                />
            </View>

            <NavFavourites/>
            </View>

            <View style={tw`flex-row justify-evenly py-2 mt-auto`}>
              <TouchableOpacity style={tw`flex flex-row justify-evenly bg-black w-36 px-4 py-3 rounded-full`}>
                <Icon name="car" type="font-awesome" color="white" size={24}/>
                <Text style={tw`font-montserrat text-base text-white text-center`}>Rides</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex flex-row justify-evenly w-36 px-4 py-3 rounded-full`}>
                <Icon name="fast-food-outline" type="ionicon" color="black" size={24}/>
                <Text style={tw`font-montserrat text-base text-center`}>Eats</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    );
};

export default NavigateCard;

const InputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})