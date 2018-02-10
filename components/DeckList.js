import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import { fetchDecks } from '../actions'
import { getCardsCount } from '../utils/api'

import DeckListItem from './DeckListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  deckLink: {
    flex: 1,
  }
})

class DeckList extends Component {
  componentDidMount() {
    this.props.onFetchDecks()
  }

  render() {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.deckLink}
              onPress={() =>
                this.props.navigation.navigate('DeckDetails', {
                  deckId: item.id
                })
              }
            >
              <DeckListItem
                title={item.title}
                subTitle={item.cardCount}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ decks }) => {
  const decksToDisplay = Object.keys(decks).map(key => {
    return {
      id: key,
      title: decks[key].title,
      cardCount: getCardsCount(decks[key])
    }
  })

  return {
    decks: decksToDisplay
  }
}

const mapDispatchToProps = dispatch => ({
  onFetchDecks: () => dispatch(fetchDecks())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
