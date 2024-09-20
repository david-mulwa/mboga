import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store'; 
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '.';
import RestaurantScreen from './ResturantScreen';
import BasketScreen from './BasketScreen';
import preOrderScreen from './preOrderScreen';

const Stack = createNativeStackNavigator();

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
          component={Index} 
        />
        <Stack.Screen 
          name="Restaurant" // Ensure this name matches with your navigation action
          options={{ headerShown: false }} 
          component={RestaurantScreen} 
        />
        <Stack.Screen 
          name='Basket'
          options={{headerShown: false,
            presentation: 'modal',
          }}
          component={BasketScreen}
        />
        <Stack.Screen name='PreOrder'
          options={{headerShown: false,
            presentation:'fullScreenModal',

          }}
          component={preOrderScreen}/>
      </Stack.Navigator>
    </Provider>
  );
};

export default TabLayout;
