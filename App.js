import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { ModalPortal } from 'react-native-modals';
import store from './store';
import { Provider } from 'react-redux';

export default function App() {

  return (
<>
<StatusBar style='light'/>

<Provider store={store}>
      <StackNavigator/>
           <ModalPortal />     
            </Provider>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
