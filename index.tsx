/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
    return (
      <NavigationContainer>
          <PaperProvider>
            <App />
          </PaperProvider>
      </NavigationContainer>
    );
  }

AppRegistry.registerComponent(appName, () => Main );
