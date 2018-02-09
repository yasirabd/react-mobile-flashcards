import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, StyleSheet } from 'react-native'

import { fetchDecks } from '../actions'
import { getCardsCount } from '../utils/api'

import DeckListItem from './DeckListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
        {decks.length > 0 &&
          decks.map(deck => (
            <DeckListItem
              key={deck.id}
              title={deck.title}
              subTitle={deck.cardCount}
            />
        ))}
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
