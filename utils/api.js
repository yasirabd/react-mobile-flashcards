import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECK_STORAGE_KEY = 'flashcard:decks'
const NOTIFICATION_KEY = 'flashcard:notification'

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

export function addDeck(deckTitle: string) {
  const newDeck = {
    [deckTitle]: {
      title: deckTitle,
      questions: [],
    }
  }

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
    .then(() => newDeck)
}

export function addCard(title: string, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(decks => {
    const data = JSON.parse(decks)
    const updatedDeck = {
      ...data[title],
      questions: [...data[title].questions, card]
    }
    const updatedData = {
      ...data,
      [title]: updatedDeck
    }
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updatedData))

    return updatedDeck
  })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

function buildNotification() {
  return {
    title: 'Quiz Reminder!',
    body: "Checkout the new question today",
    ios: {
      sound: true
    },
    android: {
      sound: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(23, 0, 0)
            Notifications.scheduleLocalNotificationAsync(buildNotification(), {
              time: tomorrow,
              repeat: 'day',
            })
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
