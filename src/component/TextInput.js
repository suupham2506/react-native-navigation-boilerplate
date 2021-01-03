import React, {forwardRef} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import PropTypes from 'prop-types';
import Colors from 'theme/Colors';
import {MyText} from 'component';
import {onDetectStyle} from 'theme/Device';

const MyTextInput = forwardRef(
  (
    {
      style,
      type,
      keyboardType,
      maxLength,
      onBlur,
      onChangeText,
      onFocus,
      onKeyPress,
      placeholder,
      placeholderTextColor,
      align,
      onSubmitEditing,
      returnKeyType,
      secureTextEntry,
      error,
      touched,
      color,
      ...props
    },
    inputRef,
  ) => {
    const colorScheme = useColorScheme();
    const textColor =
      color || (colorScheme === 'dark' ? Colors.white : Colors.black);

    const defaultStyle = {
      color: textColor,
      height: 50,
      paddingHorizontal: 20,
      borderRadius: 25,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: touched && error ? Colors.error : textColor,
    };

    return (
      <View>
        <TextInput
          {...props}
          ref={inputRef}
          style={[defaultStyle, onDetectStyle(type), style]}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          placeholderTextColor={textColor}
          placeholder={placeholder}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
        />
        {touched && error && (
          <MyText type="light-12" style={styles.errorText}>
            {error}
          </MyText>
        )}
      </View>
    );
  },
);

MyTextInput.propTypes = {
  style: PropTypes.any,
  type: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  onSubmitEditing: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.bool,
  color: PropTypes.string,
};

MyTextInput.defaultProps = {
  style: {},
  placeholder: 'Write something',
  type: 'regular-16',
};

export default MyTextInput;

const styles = StyleSheet.create({
  errorText: {
    paddingTop: 8,
    paddingLeft: 20,
  },
});
