import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'flashcard:decks'

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ]
  },
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(decks => {
    if(decks === null) {
      return AsyncStorage.setItem(
        DECK_STORAGE_KEY,
        JSON.stringify(initialDecks)
      ).then(() => initialDecks)
    }
    return JSON.parse(decks)
  })
}

export function getCardsCount(deck) {
  const count = deck && deck.questions ? deck.questions.length : 0
  return count <= 1 ? `${count} card` : `${count} cards`
}

export function getDeckById(deckId: string) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => {
    const decks = JSON.parse(data)
    return decks[deckId]
  })
}
