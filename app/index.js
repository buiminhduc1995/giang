import React, { Component } from 'react';
import store from './redux/store/index';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import AppWithNavigationState from './navigation/index';
import NotifyNewFeatureModal from './components/NotifyNewFeatureModal';
import codePush from "react-native-code-push";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
          <NotifyNewFeatureModal />
        </View>
      </Provider>
    );
  }
}
export default MyApp = codePush(App);

