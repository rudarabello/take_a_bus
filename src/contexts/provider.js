import React, {createContext, useState} from 'react';
import {Dimensions} from 'react-native';

export const DataContext = createContext({});

export function DataProvider({children}) {
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
  return (
    <DataContext.Provider
      value={{
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
        toggleAlert,
        location,
        setLocation,
      }}>
      {children}
    </DataContext.Provider>
  );
}
