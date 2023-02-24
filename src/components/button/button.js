import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from '../../themes/global_styles';

// eslint-disable-next-line react/prop-types
export const Button = ({handleLoading}) => {
  return (
    <TouchableOpacity
      style={[styles.touchable]}
      onPress={() => handleLoading()}>
      <Text style={styles.touchableText}>Bus Stops</Text>
    </TouchableOpacity>
  );
};
