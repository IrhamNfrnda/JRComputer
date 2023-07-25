import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Import your screen components
import MainMenu from './src/views/main/MainMenuScreen';

import LoginScreen from './src/views/auth/LoginScreen';
import RegisterScreen from './src/views/auth/RegisterScreen';
import ProductDetailScreen from './src/views/main/ProductDetailScreen';
import OrderScreen from './src/views/main/OrderScreen';
import PaymentScreen from './src/views/main/PaymentScreen';
import MyOrderScreen from './src/views/main/MyOrderScreen';
import OrderServiceScreen from './src/views/main/OrderServiceScreen';
import About from './src/views/main/AboutScreen';

import ServiceScreen from './src/views/main/ServiceScreen';
import ProfileScreen from './src/views/profile/ProfileScreen'
import UpdateProfileScreen from './src/views/profile/UpdateProfileScreen'
import AboutScreen from './src/views/main/AboutScreen';

import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BtNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.navigate(route.name);
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }
            return null;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={MainMenu}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="toolbox" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="My Orders"
        component={MyOrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="list" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="user" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="store" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainMenu" component={BtNavigation} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="EditProfile" component={UpdateProfileScreen} />
        <Stack.Screen name="OrderService" component={OrderServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
