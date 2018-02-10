import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as t from 'tcomb-form-native'
import { addDeck } from '../actions'
import { white, darkPrimary } from '../utils/colors'

const { Form } = t.form
const Deck = t.struct({
  name: t.String,
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  }
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
    this.props.onAddDeck(value.name).then(() => {
      this.clearForm()
    })
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
          underLayColor={darkPrimary}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onAddDeck: (name: string) => dispatch(addDeck(name))
})

export default connect(undefined, mapDispatchToProps)(DeckNew)
