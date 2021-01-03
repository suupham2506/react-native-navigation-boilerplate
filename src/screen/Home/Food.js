import React from 'react';
import {View} from 'react-native';
import {MyText} from 'component';

const Food = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MyText>Food</MyText>
    </View>
  );
};

Food.options = {};

export default Food;
