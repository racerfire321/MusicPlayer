 // App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'; 
import PlayerScreen from './src/screens/PlayerScreen'; 
import MapScreen from './src/screens/MapScreen';
import { Text } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    // <Text>Hello</Text>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} /> 
        <Stack.Screen name="MapScreen" component={MapScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>   
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import { Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native';
// import WebView from 'react-native-webview';
// import Geolocation from 'react-native-geolocation-service';

// const App = () => {
//   const [mLat, setMLat] = useState(0); // latitude position
//   const [mLong, setMLong] = useState(0); // longitude position

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'App Location Permission',
//           message:
//             'App needs access to your location ' +
//             'Locate yourself',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the location');
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         console.log(position);
//         setMLat(position.coords.latitude);
//         setMLong(position.coords.longitude);
//       },
//       error => {
//         // See error code charts below.
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html: `<html>
//             <head>
//             <style>
//               body, html {
//                 height: 100%;
//                 margin: 0;
//                 padding: 0;
//               }
//               #map {
//                 height: 100%;
//               }
//             </style>
//           </head>
//           <body>
//             <div id="map"></div>
//             <script>
//               function initMap() {
//                 const map = new google.maps.Map(document.getElementById('map'), {
//                   center: { lat: 21.693602091083623, lng: 77.21464383448563 },
//                   zoom: 10
//                 });
//                 const tileUrl = 'https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga';
//                 const overlayMapType = new google.maps.ImageMapType({
//                   getTileUrl: function(coord, zoom) {
//                     return tileUrl
//                       .replace('{x}', coord.x)
//                       .replace('{y}', coord.y)
//                       .replace('{z}', zoom);
//                   },
//                   tileSize: new google.maps.Size(256, 256),
//                   name: 'Custom Map'
//                 });
//                 map.overlayMapTypes.push(overlayMapType);
//               }
//             </script>
//             // <script src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap"></script>
//           </body>
//         </html>` }}
//       />
//       <TouchableOpacity
//         style={{
//           width: '90%',
//           height: 50,
//           alignSelf: 'center',
//           position: 'absolute',
//           backgroundColor: 'green',
//           bottom: 20, // Adjusted positioning
//         }}
//         onPress={getLocation}
//       >
//         <Text>Get Current Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;

// // import React from 'react';
// // import { Text, View } from 'react-native';
// // import WebView from 'react-native-webview';

// // const App = () => {
// //   return (
// //     <View style={{ flex: 1 }}>
// //       <WebView
// //         originWhitelist={['*']}
// //         javaScriptEnabled={true}
// //         domStorageEnabled={true}
// //         source={{ html: `
// //           <html>
// //             <head>
// //               <style>
// //                 body, html {
// //                   height: 100%;
// //                   margin: 0;
// //                   padding: 0;
// //                 }
// //                 #map {
// //                   height: 100%;
// //                 }
// //               </style>
// //             </head>
// //             <body>
// //               <div id="map"></div>
// //               <script>
// //                 function initMap() {
// //                   const map = new google.maps.Map(document.getElementById('map'), {
// //                     center: { lat: 28.693602091083623, lng: 77.21464383448563 },
// //                     zoom: 10
// //                   });
// //                   const tileUrl = 'https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga';
// //                   const overlayMapType = new google.maps.ImageMapType({
// //                     getTileUrl: function(coord, zoom) {
// //                       return tileUrl
// //                         .replace('{x}', coord.x)
// //                         .replace('{y}', coord.y)
// //                         .replace('{z}', zoom);
// //                     },
// //                     tileSize: new google.maps.Size(256, 256),
// //                     name: 'Custom Map'
// //                   });
// //                   map.overlayMapTypes.push(overlayMapType);
// //                 }
// //               </script>
// //               // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
// //             </body>
// //           </html>
// //         ` }}
// //       />
// //     </View>
// //   );
// // };

// // export default App;

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default () => (
//   <View style={styles.container}>
//     <MapView
//       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//       style={styles.map}
//       region={{
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }}></MapView>
//   </View>
// );
