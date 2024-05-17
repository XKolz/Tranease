import { View, Text, StyleSheet, Button } from "react-native";
// import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const DashboardScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="View user's details" onPress={() => navigation.jumpTo("Profile")} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
