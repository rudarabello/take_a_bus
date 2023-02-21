import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {styles} from './styles';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
