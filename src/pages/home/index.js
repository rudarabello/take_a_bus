import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import {styles, mapStyle} from './styles';
import {busStopsRequest} from '../../services/apiRequests';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
//import {Map} from '../../components/map_view';
import {DataContext} from '../../contexts/provider';

export default function Home() {
  const {
    busStops,
    setBusStops,
    noticesApi,
    setNoticesApi,
    errorMsg,
    setErrorMsg,
    visiblePoints,
    setVisiblePoints,
    button,
    setButton,
    location,
    setLocation,
  } = useContext(DataContext);
  const {width, height} = Dimensions.get('window');
  const AspectRatio = width / height;
  const LatitudeDelta = 0.02;
  const LongitudeDelta = LatitudeDelta * AspectRatio;
  // const [busStops, setBusStops] = useState([]);
  // const [noticesApi, setNoticesApi] = useState();
  // const [errorMsg, setErrorMsg] = useState(false);
  // const [visiblePoints, setVisiblePoints] = useState(false);
  // const [button, setButton] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  function toggleAlert(data) {
    setNoticesApi(data);
    setVisibleAlert(!visibleAlert);
  }
  // const [location, setLocation] = useState({
  //   latitude: 40.7415,
  //   longitude: -74.0034,
  //   latitudeDelta: LatitudeDelta,
  //   longitudeDelta: LongitudeDelta,
  // });

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
            toggleAlert(e.title);
          });
        }
        setBusStops([data.stations]);
      } catch (error) {
        toggleAlert(`${error}`);
      } finally {
        setLoading(false);
      }
    }

    getPermition();
  }, [visiblePoints]);

  function handleLoading() {
    setVisiblePoints(!visiblePoints);
    setLoading(true);
  }

  if (errorMsg == false) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
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
            onMapLoaded={() => setButton(true)}
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
          {/* <Map
            location={location}
            visiblePoints={visiblePoints}
            busStops={busStops}
            setButton={setButton}
            button={button}
          /> */}
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
            <Text style={styles.messageFancyAlert}>
              {noticesApi} with radius of 500m
            </Text>
            <TouchableOpacity onPress={toggleAlert}>
              <Text>Close</Text>
            </TouchableOpacity>
          </FancyAlert>
          {button && (
            <TouchableOpacity
              style={[styles.touchable]}
              onPress={() => handleLoading()}>
              <Text style={styles.touchableText}>Bus Stops</Text>
            </TouchableOpacity>
          )}
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
