import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../../themes/global_styles';

// eslint-disable-next-line react/prop-types
export const ErrorMessage = ({errorMsg}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.permissonDenied}>{errorMsg}</Text>
    </View>
  );
};
