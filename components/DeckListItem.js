import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DeckListItem = props => {
  const { title, subTitle } = props

  return (
    <View>
      <View>
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
    </View>
  )
}

export default DeckListItem
