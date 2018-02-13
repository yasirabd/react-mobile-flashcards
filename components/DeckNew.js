import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as t from 'tcomb-form-native'
import { addDeck } from '../actions'
import { white, darkPrimary, secondary } from '../utils/colors'

const Form = t.form.Form
const Deck = t.struct({
  title: t.String,
})

class DeckNew extends Component {
  state = {
    value: null
  }
  onChange = value => {
    this.setState({ value })
  }
  clearForm = () => {
    this.setState({ value: null })
  }
  onPress = () => {
    var value = this.refs.form.getValue();
    this.props.onAddDeck(value.title).then(() => {
      this.clearForm()
      this.toDeckDetails(value.title)
    });
  }
  toDeckDetails = (deckTitle: string) => {
    this.props.navigation.navigate('DeckDetails', { deckId: deckTitle })
  }
  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Deck}
          value={this.state.value}
          onChange={this.onChange}
        />
        <TouchableOpacity
          onPress={this.onPress}
          underlayColor={secondary}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  buttonText: {
    fontSize: 18,
    color: white,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    padding: 10,
    backgroundColor: secondary,
    borderColor: secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

const mapDispatchToProps = dispatch => ({
  onAddDeck: (title: string) => dispatch(addDeck(title))
})

export default connect(undefined, mapDispatchToProps)(DeckNew)
