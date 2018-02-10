import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { primary, secondary, lightPrimary, darkPrimary, white } from '../utils/colors'

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: darkPrimary,
    marginBottom: 10,
    padding: 25,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
    color: white,
  },
  subTitle: {
    fontSize: 14,
    color: secondary,
  },
})

const DeckListItem = props => {
  const { title, subTitle } = props

  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  )
}

export default DeckListItem
