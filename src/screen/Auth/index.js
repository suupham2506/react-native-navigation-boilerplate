import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {unwrapResult} from '@reduxjs/toolkit';
import {KeyboardContainer, MyText, MyTextInput} from 'component';
import {useDispatch} from 'react-redux';
import Colors from 'theme/Colors';
import {signIn} from 'redux/AuthReducer';
import {appLoad} from 'redux/ConfigReducer';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

const Login = ({}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, {setSubmitting}) => {
      dispatch(signIn(values))
        .then(unwrapResult)
        .then(() => {
          setSubmitting(false);
          dispatch(appLoad());
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  });

  const passwordRef = useRef();

  return (
    <KeyboardContainer style={styles.container} loading={formik.isSubmitting}>
      <View style={styles.topView}>
        <MyText type="semibold-22">Let's get started</MyText>
        <MyText type="regular-14" style={{paddingVertical: 10}}>
          Log in to your exist account to see all features
        </MyText>
      </View>
      <View style={styles.inputView}>
        <MyTextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={formik.handleChange('email')}
          returnKeyType="next"
          touched={formik.touched.email}
          error={formik.errors.email}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <MyTextInput
          ref={passwordRef}
          placeholder="Enter your password"
          returnKeyType="done"
          secureTextEntry
          onChangeText={formik.handleChange('password')}
          style={styles.passwordTextInput}
          touched={formik.touched.password}
          error={formik.errors.password}
        />
      </View>
      <MyText type="regular-14" align="right" color={Colors.primary}>
        Forgot password?
      </MyText>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={formik.handleSubmit}>
        <MyText type="medium-16" color={Colors.white}>
          Login
        </MyText>
      </TouchableOpacity>

      <MyText type="regular-14" style={styles.otherConnectText} align="center">
        Or connect using
      </MyText>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.facebookButton}>
          <Icon name="facebook-f" size={25} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Icon name="google" size={23} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <MyText type="regular-14" align="center">
        Don't have account?{'  '}
        <MyText
          type="medium-14"
          color={Colors.primary}
          decorationLine="underline">
          Create an account
        </MyText>
      </MyText>
    </KeyboardContainer>
  );
};

Login.options = {
  topBar: {
    visible: false,
  },
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  topView: {
    marginTop: 80,
  },
  inputView: {
    marginVertical: 20,
  },
  passwordTextInput: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  otherConnectText: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  facebookButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.facebook,
  },
  googleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: Colors.google,
  },
});
