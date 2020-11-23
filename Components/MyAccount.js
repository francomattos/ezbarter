import React from 'react';
import {Text, View, Button} from 'react-native';
import {useAuth} from './Database/AuthProvider';
import styles from './Styles/Components.Styles';

export function MyAccount() {
  const {user, logOut} = useAuth();
  return (
    <View style={styles.pagesHeader}>
      <View>
        <Text style={{fontSize: 16}}>
          My Account
          {'\n'}
          {'\n\n'}
          Email: {user.email}
          {'\n\n'}
          First Name: {user.firstname}
          {'\n\n'}
          Last Name: {user.lastname}
          {'\n\n'}
          ZipCode: {user.zipcode}
          {'\n\n'}
          User ID : {user.id}
          {'\n\n'}
          {'\n\n'}
        </Text>
      </View>
      <View>
        <Button type="outline" title="Log Out" onPress={logOut} />
      </View>
    </View>
  );
}
