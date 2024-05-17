import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet, 
    ActivityIndicator,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity, 
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import CustomButton from '../components/CustomButtons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token, navigation]);

  const handleRegister = () => {
    dispatch(register({ email, password }));
  };

  return (
    <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    style={styles.container}
  >
      <View style={styles.form}>
        <Image
              source={require("../assets/1.webp")}
              style={{
                width: '70%',
                height: 270,
                alignSelf: "center",
                marginBottom: 50,
              }}
            />
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <CustomButton title="Register" onPress={handleRegister} />
          )}
          {error && <Text style={styles.error}>{error.error || 'Registration failed. Please try again.'}</Text>}
          <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  passwordContainer: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    padding: 5,
  },
});
