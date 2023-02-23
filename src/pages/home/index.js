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
import {busStopsRequest} from '../../services/apiRequests';
import {FancyAlert} from 'react-native-expo-fancy-alerts';

export default function Home() {
  const {width, height} = Dimensions.get('window');
  const AspectRatio = width / height;
  const LatitudeDelta = 0.02;
  const LongitudeDelta = LatitudeDelta * AspectRatio;
  const [busStops, setBusStops] = useState([]);
  const [noticesApi, setNoticesApi] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [visiblePoints, setVisiblePoints] = useState(false);
  const [button, setButton] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  function toggleAlert(data) {
    setNoticesApi(data);
    setVisibleAlert(!visibleAlert);
  }
  const [location, setLocation] = useState({
    latitude: 40.7415,
    longitude: -74.0034,
    latitudeDelta: LatitudeDelta,
    longitudeDelta: LongitudeDelta,
  });

  useEffect(() => {
    async function getPermition() {
      let {status} = await Location.requestForegroundPermissionsAsync();
      getCoords();
      if (status !== 'granted') {
        setErrorMsg(true);
        toggleAlert(
          'Permission to access location was denied, please go to settings and allow Take a Bus to know your location.',
        );
      }
    }

    async function getCoords() {
      let {coords} = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: LatitudeDelta,
        longitudeDelta: LongitudeDelta,
      });
      fetchBusStops();
    }
    async function fetchBusStops() {
      try {
        const {latitude, longitude} = location;
        const {data} = await busStopsRequest(latitude, longitude);
        if (data.notices) {
          const {notices} = data;
          notices.map(e => {
            console.log(e.title);
            toggleAlert(e.title);
          });
        }
        setBusStops([data.stations]);
      } catch (error) {
        toggleAlert(`${error}`);
      }
    }

    getPermition();
  }, [visiblePoints]);

  if (errorMsg == false) {
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
        <View>
          <FancyAlert
            visible={visibleAlert}
            icon={
              <View style={styles.iconFancyAlert}>
                <Text>!</Text>
              </View>
            }
            style={styles.fancyAlert}>
            <Text style={styles.messageFancyAlert}>{noticesApi}</Text>
            <TouchableOpacity onPress={toggleAlert}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </FancyAlert>
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
