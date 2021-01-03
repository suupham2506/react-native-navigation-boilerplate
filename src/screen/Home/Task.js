import React from 'react';
import {View} from 'react-native';
import {MyText} from 'component';

const Task = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MyText>Task</MyText>
    </View>
  );
};

Task.options = {};

export default Task;
