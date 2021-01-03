import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null);

  const setStateCallback = (state, cb) => {
    cbRef.current = cb;
    setState(state);
  };

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
};

const lightenColor = (color, amount) => {
  if (color[0] === '#') {
    color = color.slice(1);
  }
  const colorValue = parseInt(color, 16);

  // red
  let red = (colorValue >> 16) + amount;
  if (red > 255) {
    red = 255;
  } else if (red < 0) {
    red = 0;
  }

  // blue
  let blue = ((colorValue >> 8) & 0x00ff) + amount;
  if (blue > 255) {
    blue = 255;
  } else if (blue < 0) {
    blue = 0;
  }

  // green
  let green = (colorValue & 0x0000ff) + amount;
  if (green > 255) {
    green = 255;
  } else if (green < 0) {
    green = 0;
  }
  return `#${(green | (blue << 8) | (red << 16)).toString(16)}`;
};

const Photo = (props) => {
  const {
    style,
    placeholderSource,
    animationStyle,
    placeholderColor,
    imageKey,
    source,
    delay,
    onPress,
  } = props;

  const photoStyle =
    typeof style === 'number' ? StyleSheet.flatten(style) : style;

  const {width, height} = photoStyle;

  if (!width || !height) {
    if (__DEV__) {
      console.warn('Width and height should be defined in styles.');
    }
  }

  const animationPhotoStyle = placeholderSource ? 'fade' : animationStyle;

  const [photoState, setPhotoState] = useStateCallback({
    failed: false,
    imageOpacity: new Animated.Value(0),
    loaded: false,
    placeholderColorAnimated: new Animated.Value(1),
    placeholderColorLightened: placeholderColor
      ? lightenColor(placeholderColor, 20)
      : 'transparent',
    placeholderOpacity: new Animated.Value(1),
    placeholderScale: new Animated.Value(1),
  });

  useEffect(() => {
    if (!placeholderSource) {
      animatePlaceholderColor();
    }
  }, []);

  const onError = () => {
    setPhotoState({...photoState, failed: true}, () => {
      Animated.timing(photoState.placeholderColorAnimated, {
        duration: 200,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });
  };

  const onLoad = () => {
    const callback = () => setPhotoState({...photoState, loaded: true});
    switch (animationPhotoStyle) {
      case 'fade':
        return Animated.parallel([
          Animated.timing(photoState.placeholderOpacity, {
            delay,
            duration: 200,
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.timing(photoState.imageOpacity, {
            delay,
            duration: 300,
            toValue: 1,
            useNativeDriver: false,
          }),
        ]).start(callback);

      case 'shrink':
        return Animated.parallel([
          Animated.parallel([
            Animated.timing(photoState.placeholderOpacity, {
              delay,
              duration: 200,
              toValue: 0,
              useNativeDriver: false,
            }),
            Animated.timing(photoState.placeholderScale, {
              delay,
              duration: 200,
              toValue: 0,
              useNativeDriver: false,
            }),
          ]),
          Animated.timing(photoState.imageOpacity, {
            delay,
            duration: 300,
            toValue: 1,
            useNativeDriver: false,
          }),
        ]).start(callback);

      default:
        // explode
        return Animated.sequence([
          Animated.parallel([
            Animated.timing(photoState.placeholderScale, {
              delay,
              duration: 100,
              toValue: 0.7,
              useNativeDriver: false,
            }),
            Animated.timing(photoState.placeholderOpacity, {
              duration: 100,
              toValue: 0.66,
              useNativeDriver: false,
            }),
          ]),
          Animated.parallel([
            Animated.parallel([
              Animated.timing(photoState.placeholderOpacity, {
                duration: 200,
                toValue: 0,
                useNativeDriver: false,
              }),
              Animated.timing(photoState.placeholderScale, {
                duration: 200,
                toValue: 1.2,
                useNativeDriver: false,
              }),
            ]),
            Animated.timing(photoState.imageOpacity, {
              delay: 200,
              duration: 300,
              toValue: 1,
              useNativeDriver: false,
            }),
          ]),
        ]).start(callback);
    }
  };

  const animatePlaceholderColor = () => {
    if (photoState.failed || photoState.loaded) return;
    Animated.sequence([
      Animated.timing(photoState.placeholderColorAnimated, {
        duration: 500,
        toValue: 1.0,
        useNativeDriver: false,
      }),
      Animated.timing(photoState.placeholderColorAnimated, {
        duration: 400,
        toValue: 0.0,
        useNativeDriver: false,
      }),
    ]).start(animatePlaceholderColor);
  };

  return (
    <TouchableOpacity
      style={style}
      disabled={!photoState.loaded}
      onPress={onPress}>
      {!photoState.failed && (
        <Animated.Image
          key={imageKey}
          source={source}
          resizeMode={'contain'}
          style={[
            style,
            {
              opacity: photoState.imageOpacity,
              ...styles().image,
            },
          ]}
          onLoad={onLoad}
          onError={onError}
        />
      )}

      {placeholderSource && !photoState.loaded && (
        <Animated.Image
          source={placeholderSource}
          style={[
            style,
            {
              opacity: photoState.placeholderOpacity,
              ...styles().image,
            },
          ]}
        />
      )}

      {!placeholderSource && !photoState.loaded && (
        <Animated.View
          style={[
            style,
            {
              backgroundColor: placeholderColor
                ? photoState.placeholderColorAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      placeholderColor,
                      photoState.placeholderColorLightened,
                    ],
                  })
                : 'transparent',
              opacity: photoState.placeholderOpacity,
              position: 'absolute',
              transform: [{scale: photoState.placeholderScale}],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = (props) => {
  return StyleSheet.create({
    image: {
      position: 'absolute',
      resizeMode: 'contain',
    },
  });
};

Photo.defaultProps = {
  animationStyle: 'explode',
};

Photo.propTypes = {
  animationStyle: PropTypes.oneOf(['fade', 'shrink', 'explode']),
  delay: PropTypes.number,
  imageKey: PropTypes.string,
  placeholderColor: PropTypes.string,
  placeholderSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.any,
};

export default Photo;
