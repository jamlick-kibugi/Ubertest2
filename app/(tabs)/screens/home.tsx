import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, Dimensions } from "react-native";
import tw from 'twrnc'
import NavOptions from "../components/navOptions";
import { SearchBarAndroid } from "@rneui/base/dist/SearchBar/SearchBar-android";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/navFavourites";

const HomeScreen = () => {
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
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-7`}>
                <Image
                style = {{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                }}
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
                }}
                />
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
                        /*item && setSelectedItem(item.title)
                        item && setLat(item.lat)
                        item && setLon(item.lon)*/
                        item && dispatch(setOrigin({
                            latitude: item.lat,
                            longitude: item.lon,
                            description: item.title
                        }))
                        dispatch(setDestination(null))
                      }}
                      debounce={600}
                      suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                      onClear={onClearPress}
                      //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                      onOpenSuggestionsList={onOpenSuggestionsList}
                      loading={loading}
                      useFilter={false}
                      textInputProps={{
                        placeholder: 'Enter pickup location',
                        placeholderTextColor: '#000000',
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        style: {
                          borderRadius: 25,
                          backgroundColor: '#fff',
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
                        backgroundColor: '#fff',
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
                
                <NavOptions/>
                <NavFavourites
                  screen="homescreen"
                />
            </View>
        </SafeAreaView>
        
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue",
        fontSize: 50,
    },
});