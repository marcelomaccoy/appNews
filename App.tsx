/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Record from './src/screens/Record';
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme, 
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App: () => Node = () => {

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} initialParams={{ action: 'home' }}/>
          <Stack.Screen name="Add" component={Record} options={{ title: 'Adicionar notícia' }} initialParams={{ action: 'add' }}/>
          <Stack.Screen name="Update" component={Record} options={{ title: 'Editar notícia' }} initialParams={{ action: 'update' }}/>
          <Stack.Screen name="View" component={Record} options={{ title: 'Visualizar notícia' }} initialParams={{ action: 'view' }}/>
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};



export default App;
