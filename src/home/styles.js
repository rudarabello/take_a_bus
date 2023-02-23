import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  map: {
    width: '100%',
    height: '100%',
  },

  permissonDenied: {
    height: '50%',
    width: '70%',
    zIndex: 1,
    fontSize: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonCallout: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  touchable: {
    backgroundColor: 'yellow',
    opacity: 0.8,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  touchableText: {
    fontSize: 16,
  },
});

export const mapStyle = [
  {
    featureType: 'transit.station.bus',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
];
