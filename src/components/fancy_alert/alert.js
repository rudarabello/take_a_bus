import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import {styles} from '../../themes/global_styles';

// eslint-disable-next-line react/prop-types
export const Alert = ({visibleAlert, noticesApi, toggleAlert}) => {
  return (
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
  );
};
