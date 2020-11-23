import React, {useState} from 'react';
//Brings in native elements for the input forms and styled buttons
import {Button, Text, Input} from 'react-native-elements';
import {useAuth} from './Database/AuthProvider';
import {useNavigation} from '@react-navigation/native';

// This view has an input for email and password and logs in the user when the login button is pressed
export function LogInView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const {logIn} = useAuth();
  const navigation = useNavigation();

  return (
    <>
      <Text h3>Login</Text>
      <Input autoCapitalize="none" placeholder="user" onChangeText={setEmail} />
      <Input
        secureTextEntry={true}
        placeholder="password"
        onChangeText={setPassword}
      />
      {/* When user presses button, checks login, if success logs in if not returns error */}
      <Button
        onPress={async () => {
          setError(null);
          try {
            if (logIn(email, password) != true) {
              setError(
                'Failed to login' +
                  '\n' +
                  'Please check user name and password',
              );
            }
          } catch (e) {
            console.log(`Operation failed: ${e.message}`);
          }
        }}
        title="Login"
      />

      <Button
        onPress={() => navigation.navigate('RegisterPage')}
        title="Register"
        type="clear"
        titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
      />

      <Text>{error}</Text>
    </>
  );
}
