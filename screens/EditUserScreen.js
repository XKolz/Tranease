import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails, clearUpdateSuccess } from '../redux/authSlice';

export default function EditUserScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user, loading, updateSuccess, error } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.first_name || '');
      setJob(user.job || '');
    }
  }, [user]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(clearUpdateSuccess());
      navigation.navigate('Home');
    }
  }, [updateSuccess, dispatch, navigation]);

  const handleUpdate = () => {
    if (user) {
      dispatch(updateUserDetails({ id: user.id, name, job }));
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Job"
        value={job}
        onChangeText={setJob}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Update" onPress={handleUpdate} />
      )}
      {error && <Text style={styles.error}>{error.error || 'Update failed. Please try again.'}</Text>}
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
