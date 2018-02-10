import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import { fetchDeckById } from '../actions'
import { getCardsCount } from '../utils/api'

class DeckDetails extends Component {
  componentDidMount() {
    const { deckId } = this.props.navigation.state.params
    this.props.onFetchDeckById(deckId)
  }

  render() {
    const { deck, cardCount } = this.props

    return (
      <View>
        <View>
          <Text>{deck && deck.title}</Text>
          <Text>{cardCount}</Text>
        </View>
        <View>
          <Text>Add Card</Text>
          <Text>Start Quiz</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ selectedDeck }) => ({
  deck: selectedDeck,
  cardCount: getCardsCount(selectedDeck)
})

const mapDispatchToProps = dispatch => ({
  onFetchDeckById: deckId => dispatch(fetchDeckById(deckId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetails)
