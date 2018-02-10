import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { fetchDeckById } from '../actions'
import { getCardsCount } from '../utils/api'

import { primary, secondary, white } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 2,
    padding: 10,
    borderWidth: 2,
  },
  addCard: {
    borderColor: primary,
    backgroundColor: primary,
    marginBottom: 10,
  },
  startQuiz: {
    borderColor: secondary,
    backgroundColor: secondary,
  },
  buttonText: {
    textAlign: 'center',
    color: white,
  }
})

class DeckDetails extends Component {
  static navigationOptions = () => ({
    title: 'Deck Details'
  })
  componentDidMount() {
    const { deckId } = this.props.navigation.state.params
    this.props.onFetchDeckById(deckId)
  }
  addNewCard = (deckId: string) => {
    this.props.navigation.navigate('CardNew', { deckId })
  }
  startQuiz = (deckId: string) => {
    this.props.navigation.navigate('Quiz', { deckId })
  }

  render() {
    const { deck, cardCount } = this.props
    const { deckId } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck && deck.title}</Text>
          <Text style={styles.subTitle}>{cardCount}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, styles.addCard]}
            onPress={() => this.addNewCard(deckId)}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          {deck && deck.questions.length > 0 && (
            <TouchableOpacity
              style={[styles.button, styles.startQuiz]}
              onPress={() => this.startQuiz(deckId)}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          )}
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
