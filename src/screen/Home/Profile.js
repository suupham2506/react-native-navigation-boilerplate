import React from 'react';
import {View} from 'react-native';
import {MyText} from 'component';

const Profile = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MyText>Profile</MyText>
    </View>
  );
};

Profile.options = {};

export default Profile;
