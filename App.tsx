import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import CameraComponent from './Components/CameraComponent';
import DetalleProducto from './screens/DetalleProducto';
import HomeScreen from './screens/HomeScreen';
import Producto from './screens/Producto';


const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>

<Tab.Navigator
      initialRouteName="CRUD PRODUCTOS"
    >
      <Tab.Screen
        name="CRUD PRODUCTOS"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Producto"
        component={Producto}
        options={{
          tabBarLabel: 'Agregar ',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="DetalleProducto"
        component={DetalleProducto}
        options={{
          tabBarLabel: 'Detalle',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="list-status" color={color} size={26} />
          ),
        }}
      />
        <Tab.Screen
        name="Capturar"
        component={CameraComponent}
        options={{
          tabBarLabel: 'Camara',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-plus" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>    




          
        </NavigationContainer>
    );
};

export default App;