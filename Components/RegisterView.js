import React, {useState} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from './Database/AuthProvider';

export function RegisterView() {
  const navigation = useNavigation();
  const {addUser} = useAuth();
  //Variables for the form input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userLogin, setLogin] = useState('');
  const [userPassword, setPassword] = useState('');
  const [zipCode, setZipcode] = useState('');

  return (
    <>
      <Text h3>Register</Text>
      <Input
        autoCapitalize="none"
        placeholder="First Name"
        onChangeText={setFirstName}
      />
      <Input
        autoCapitalize="none"
        placeholder="Last Name"
        onChangeText={setLastName}
      />
      <Input
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={setEmail}
      />
      <Input
        autoCapitalize="none"
        placeholder="User Name"
        onChangeText={setLogin}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={setPassword}
      />
      <Input
        autoCapitalize="none"
        placeholder="Zipcode"
        onChangeText={setZipcode}
      />
      <Button
        onPress={() => {
          if (
            firstName == '' ||
            lastName == '' ||
            userEmail == '' ||
            userLogin == '' ||
            userPassword == '' ||
            zipCode == ''
          )
            alert('Please enter all item information');
          else {
            idNumber = 'AaNEW' + Math.floor(Math.random() * 10000000);
            const newUserToAdd = {
              id: idNumber,
              firstname: firstName,
              lastname: lastName,
              email: userEmail,
              login: userLogin,
              password: userPassword,
              zipcode: zipCode,
            };
            addUser(newUserToAdd);
            navigation.navigate('SignIn');
          }
        }}
        title="Register"
      />
    </>
  );
}
