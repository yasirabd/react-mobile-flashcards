import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import thunk from 'redux-thunk'
import reducer from './reducers'
import DeckList from './components/DeckList'
import DeckDetails from './components/DeckDetails'
import DeckNew from './components/DeckNew'
import CardNew from './components/CardNew'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { primary, lightPrimary, darkPrimary, white, secondary } from './utils/colors'

const middlewares = [thunk]
const store = createStore(reducer, applyMiddleware(...middlewares))

function FlashcardStatusBar ({ backgroundColor, ...props }) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor, focused }) => <MaterialCommunityIcons name='cards-outline' size={30} color={focused ? primary : tintColor} />
    }
  },
  DeckNew: {
    screen: DeckNew,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name='ios-add' size={30} color={focused ? primary : tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? primary : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : primary,
    },
    indicatorStyle: {
      backgroundColor: Platform.OS === 'ios' ? white : secondary,
    }
  }
})

const navigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: primary,
  },
}

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions,
  },
  CardNew: {
    screen: CardNew,
    navigationOptions
  },
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashcardStatusBar backgroundColor={darkPrimary} barStyle="light-content" />
          <MainNavigator />
        </View>
    </Provider>
    );
  }
}
