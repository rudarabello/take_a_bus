import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, {Callout, Marker} from 'react-native-maps';
import {styles, mapStyle} from './styles';
import {API_KEY} from '@env';
import api from '../api/index';
import {alert} from '../helpers/alert';

export default function Home() {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [busStops, setBusStops] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [visiblePoints, setVisiblePoints] = useState(false);
  const [button, setButton] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
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
    async function fetchBusStops() {
      const {latitude, longitude} = location;
      const ApiGet = `stations?apiKey=${API_KEY}&in=${latitude},${longitude}&r=2000`;
      const promise = api.get(ApiGet);
      promise.then(response => GoTo(response.data));
      promise.catch(() => {
        alert(
          'Error ao carregar pontos de ônibus, por favor verifique sua conexão',
          'OK',
          'error',
        );
      });
    }

    getPermition();
    fetchBusStops();
  }, [visiblePoints]);

  function GoTo(data) {
    setBusStops([data.stations]);
  }

  if (location.latitude != 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={location}
            showsPointsOfInterest={true}
            showsUserLocation={true}
            loadingEnabled={true}
            customMapStyle={mapStyle}
            userLocationUpdateInterval={3000}
            zoomEnabled={true}
            zoomTapEnabled={true}
            onMapReady={() => setButton(!button)}
            zoomControlEnabled={true}>
            {visiblePoints &&
              busStops.map(e => {
                return e.map((places, index) => {
                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: places.place.location.lat,
                        longitude: places.place.location.lng,
                      }}
                    />
                  );
                });
              })}
          </MapView>
        </View>
        <Callout style={styles.buttonCallout}>
          {button && (
            <TouchableOpacity
              style={[styles.touchable]}
              onPress={() => setVisiblePoints(!visiblePoints)}>
              <Text style={styles.touchableText}>Bus Stops</Text>
            </TouchableOpacity>
          )}
        </Callout>
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
