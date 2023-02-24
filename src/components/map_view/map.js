import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {styles, mapStyle} from '../../themes/global_styles';

// eslint-disable-next-line react/prop-types
export const Map = ({location, visiblePoints, busStops, setButton, button}) => {
  return (
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
      onMapLoaded={() => setButton(!button)}
      zoomControlEnabled={true}>
      {visiblePoints &&
        // eslint-disable-next-line react/prop-types
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
  );
};
