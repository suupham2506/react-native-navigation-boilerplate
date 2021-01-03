import * as React from 'react';
import {
  Animated,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {nanoid} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import Colors from 'theme/Colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'theme/Device';
import {MyText} from 'component';
import {appLoad, setSkipIntro} from 'redux/ConfigReducer';

const DATA = [
  {
    key: nanoid(4),
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png',
  },
  {
    key: nanoid(4),
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
  },
  {
    key: nanoid(4),
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View style={styles.indicatorContainer}>
      {DATA.map((_, index) => {
        const inputRange = [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`indicator-${index}`}
            style={[
              styles.dot,
              {
                opacity,
                transform: [{scale}],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const BottomButton = () => {
  const dispatch = useDispatch();
  const onStart = () => {
    dispatch(setSkipIntro(true));
    dispatch(appLoad());
  };
  return (
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity style={styles.bottomButton} onPress={onStart}>
        <MyText type="bold-16" color={Colors.white}>
          Start
        </MyText>
      </TouchableOpacity>
    </View>
  );
};

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: Colors.introColors.map((_, i) => i * SCREEN_WIDTH),
    outputRange: Colors.introColors.map((bg) => bg),
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  );
};

const OnBoarding = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <View style={styles.swiperContainer}>
              <View style={styles.imageContainer}>
                <Image source={{uri: item.image}} style={styles.imageIntro} />
              </View>
              <View style={styles.introInfoContainer}>
                <MyText type="bold-18" color={Colors.white} align="center">
                  {item.title}
                </MyText>
                <MyText
                  type="regular-14"
                  color={Colors.white}
                  align="center"
                  style={{paddingTop: 15}}>
                  {item.description}
                </MyText>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
      <BottomButton />
    </View>
  );
};

OnBoarding.options = {
  topBar: {
    visible: false,
  },
  statusBar: {
    style: 'light',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT / 2.8,
    flexDirection: 'row',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
    margin: 8,
  },
  bottomButtonContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'flex-start',
  },
  bottomButton: {
    marginHorizontal: 30,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  swiperContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  imageIntro: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    resizeMode: 'contain',
  },
  introInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default OnBoarding;
