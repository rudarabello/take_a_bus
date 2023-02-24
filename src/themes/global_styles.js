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
  safeAreaView: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
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
  touchable: {
    opacity: 0.5,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
    borderRadius: 20,
  },
  touchableText: {
    fontSize: 24,
  },
  iconFancyAlert: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 50,
    width: '100%',
  },
  fancyAlert: {backgroundColor: 'white'},
  messageFancyAlert: {
    marginTop: -16,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
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
