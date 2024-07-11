import { Image, StyleSheet, Platform, Text, View, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { store } from './store';
import HomeScreen from './screens/home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './screens/MapScreen';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import '../../assets/css/fonts.css'
import { useFonts } from 'expo-font';

export default function App() {
  const Stack = createNativeStackNavigator();
  let [fontsLoaded] = useFonts({
    "Montserrat": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-light": require("../../assets/fonts/Montserrat-Regular.ttf")
  })
  
  return (
    <AutocompleteDropdownContextProvider>
      <Provider store={store}>
      <NavigationContainer independent={true}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
          <Stack.Navigator>
            <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
            />
            <Stack.Screen
            name='MapScreen'
            component={MapScreen}
            options={{
              headerShown: false,
            }}
            />
          </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
    </AutocompleteDropdownContextProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
