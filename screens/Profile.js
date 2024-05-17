import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Button title="Edit Profile" onPress={() => navigation.navigate('EditUser')} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
});
