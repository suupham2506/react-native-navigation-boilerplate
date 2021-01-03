import auth from '@react-native-firebase/auth';

// sign in with email and password
const signInWithEmailAndPassword = async ({email, password}) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return response;
  } catch (error) {
    throw error;
  }
};

// sign up
const createUserWithEmailAndPassword = async ({email, password}) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return response;
  } catch (error) {
    console.log('sign up', error);
  }
};

export {signInWithEmailAndPassword, createUserWithEmailAndPassword};
