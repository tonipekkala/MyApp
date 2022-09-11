import {View} from 'react-native';
import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/themed';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [showRegForm, setShowReqForm] = useState(false);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    try {
      // TODO: call getUserByToken(userToken), if you get successful result,
      // set isLoggedIn to true and navigate to Tabs
      if (userToken != null) {
        const userData = await getUserByToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      // token invalid on server side
      console.error('Login - checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View>
      {showRegForm ? <RegisterForm /> : <LoginForm />}
      <Button
        title={
          showRegForm ? 'Already have an account?' : 'Register a new account'
        }
        onPress={() => {
          setShowReqForm(!showRegForm);
        }}
      ></Button>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
