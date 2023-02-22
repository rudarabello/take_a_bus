import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import * as Location from 'expo-location';
import MapView, {Callout} from 'react-native-maps';
import {styles, mapStyle} from './styles';

export default function Home() {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [errorMsg, setErrorMsg] = useState('');

  async function getPermition() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    getCoords();
    if (status !== 'granted') {
      setErrorMsg(
        'Permission to access location was denied, please go to settings and allow Take a Bus to know your location.',
      );
    }
  }

  async function getCoords() {
    let {coords} = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }
  useEffect(() => {
    getPermition();
  }, [location.latitude]);

  if (location.latitude != 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={location}
            OnMapready={getPermition()}
            showsPointsOfInterest={true}
            showsUserLocation={true}
            loadingEnabled={true}
            customMapStyle={mapStyle}
            userLocationUpdateInterval={3000}
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={true}
          />
          <Callout style={styles.buttonCallout}>
            <TouchableOpacity
              style={[styles.touchable]}
              onPress={() => console.log('press')}>
              <Text style={styles.touchableText}>Bus Stops</Text>
            </TouchableOpacity>
          </Callout>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.permissonDenied}>{errorMsg}</Text>
      </View>
    );
  }
}
