import React from 'react';
import {View} from 'react-native';
import {MyText} from 'component';

const Love = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MyText>Love</MyText>
    </View>
  );
};

Love.options = {};

export default Love;
