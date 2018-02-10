import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as t from 'tcomb-form-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, primary, secondary } from '../utils/colors'

const Form = t.form.Form
const Card = t.struct({
  question: t.String,
  answer: t.String
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
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
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

class CardNew extends Component {
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }
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
    const { deckId } = this.props.navigation.state.params
    const { question, answer } = this.refs.form.getValue()
    this.props.onAddCard(deckId, { question, answer })
    this.clearForm()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Card}
          value={this.state.value}
          onChange={this.onChange}
        />
        <TouchableOpacity
          underlayColor={secondary}
          style={styles.button}
          onPress={this.onPress}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onAddCard: (title, card) => dispatch(addCard(title, card))
})

export default connect(undefined, mapDispatchToProps)(CardNew)
