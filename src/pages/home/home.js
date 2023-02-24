import React, {useEffect, useContext} from 'react';
import {View, SafeAreaView} from 'react-native';
import * as Location from 'expo-location';
import {styles} from '../../themes/global_styles';
import {busStopsRequest} from '../../services/apiRequests';
import {Map} from '../../components/map_view/map';
import {DataContext} from '../../contexts/provider';
import Spinner from 'react-native-loading-spinner-overlay';
import {Alert} from '../../components/fancy_alert/alert';
import {Button} from '../../components/button/button';
import {ErrorMessage} from '../../components/message/error_message';

export default function Home() {
  const {
    busStops,
    setBusStops,
    noticesApi,
    toggleAlert,
    errorMsg,
    setErrorMsg,
    visiblePoints,
    setVisiblePoints,
    button,
    loading,
    setLoading,
    setButton,
    location,
    setLocation,
    LatitudeDelta,
    LongitudeDelta,
    visibleAlert,
    locationWasGet,
    setLocationWasGet,
  } = useContext(DataContext);

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
      setLocationWasGet(!locationWasGet);
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
    if (locationWasGet) {
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Spinner
              visible={loading}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Map
              location={location}
              visiblePoints={visiblePoints}
              busStops={busStops}
              setButton={setButton}
              button={button}
            />
          </View>
          <View>
            <Alert
              visibleAlert={visibleAlert}
              noticesApi={noticesApi}
              toggleAlert={toggleAlert}
            />
            {button && (
              <Button
                handleLoading={() => {
                  handleLoading();
                }}
              />
            )}
          </View>
        </SafeAreaView>
      );
    }
  } else {
    return <ErrorMessage errorMsg={errorMsg} />;
  }
}
