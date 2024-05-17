import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store, { persistor } from './redux/store';
import DashboardScreen from './screens/DashboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/Profile';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EditUserScreen from './screens/EditUserScreen';
import { loadToken, fetchUserData } from './redux/authSlice';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={25}
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 15 }}
          />
        ),
        headerShown: true,
        headerTitle: route.name,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: 'purple',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: () => <Ionicons name="person" size={20} />,
          tabBarBadge: 3,
          headerShown: true,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Overview"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
    </DrawerContentScrollView>
  );
}

function AppWrapper() {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [token, dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName={token ? "Home" : "Welcome"}
      >
        <Drawer.Screen name="Welcome" component={WelcomeScreen} options={{ drawerLabel: 'Welcome', headerShown: false }} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{ drawerLabel: 'Login', headerShown: false }} />
        <Drawer.Screen name="Register" component={RegisterScreen} options={{ drawerLabel: 'Register', headerShown: false }} />
        <Drawer.Screen name="Home" component={MyTabs} options={{ drawerLabel: 'Overview', headerShown: false }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerLabel: 'Profile', unmountOnBlur: true }} />
        <Drawer.Screen name="EditUser" component={EditUserScreen} options={{ drawerLabel: 'Edit User', headerShown: true }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
