import React from 'react';
import {Text} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import PropTypes from 'prop-types';
import Colors from 'theme/Colors';
import {onDetectStyle} from 'theme/Device';

const MyText = ({
  children,
  style,
  type,
  color,
  align,
  decorationLine,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const textColor =
    color || (colorScheme === 'dark' ? Colors.white : Colors.black);

  return (
    <Text
      {...props}
      style={[
        onDetectStyle(type),
        {
          color: textColor,
          textAlign: align,
          textDecorationLine: decorationLine,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

MyText.propTypes = {
  type: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.node,
  color: PropTypes.string,
  align: PropTypes.oneOf(['center', 'right', 'left', 'justify', 'auto']),
  decorationLine: PropTypes.oneOf([
    'none',
    'underline',
    'line-through',
    'underline line-through',
  ]),
};

MyText.defaultProps = {
  align: 'auto',
  style: {},
};

export default MyText;
