import {useContext, useEffect, useState} from 'react';

import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {Avatar, Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import {ScrollView} from 'react-native';

const Profile = () => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/200');
  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatarFile = avatarArray.pop();
      setAvatar(mediaUrl + avatarFile.filename);
      console.log(avatarFile);
    } catch (error) {
      console.log('fetchAvatar', error.message);
    }
  };
  console.log('Profile', isLoggedIn);

  useEffect(() => {
    fetchAvatar();
  }, []);

  const logOut = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Profile - logOut', error);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>
          <Icon name="person" />
          User: {user.username} id: {user.user_id}
        </Card.Title>
        <Card.Image source={{uri: avatar}} />
        <ListItem>
          <Avatar
            icon={{name: 'contact-mail', type: 'material'}}
            containerStyle={{backgroundColor: '#aaa'}}
          />
          <Text>Email: {user.email}</Text>
        </ListItem>
        <ListItem>
          <Icon name="person" />
          <Text>Full name: {user.full_name}</Text>
        </ListItem>
        <Button title="Logout" onPress={logOut} />
      </Card>
    </ScrollView>
  );
};

export default Profile;
