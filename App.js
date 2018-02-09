import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import DeckList from './components/DeckList'
import AppStatusBar from './components/AppStatusBar'
import { primary } from './utils/colors'

const middlewares = [thunk]
const store = createStore(reducer, applyMiddleware(...middlewares))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={primary} />
          <DeckList />
        </View>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
