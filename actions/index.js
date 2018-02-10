import * as api from '../utils/api'

export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS'
export const FETCH_DECK_BY_ID_SUCCESS = 'FETCH_DECK_BY_ID_SUCCESS'
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS'
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS'

export function fetchDecks() {
  return dispatch =>
    api.getDecks().then(decks => dispatch(fetchDecksSuccess(decks)))
}

function fetchDecksSuccess(decks) {
  return {
    type: FETCH_DECKS_SUCCESS,
    decks
  }
}

export function fetchDeckById(deckId: string) {
  return dispatch =>
    api.getDeckById(deckId).then(deck => dispatch(fetchDeckByIdSuccess(deck)))
}

function fetchDeckByIdSuccess(deck) {
  return {
    type: FETCH_DECK_BY_ID_SUCCESS,
    deck
  }
}

export function addDeck(deckTitle: string) {
  return dispatch =>
    api.addDeck(deckTitle).then(deck => dispatch(addDeckSuccess(deck)))
}

function addDeckSuccess(deck) {
  return {
    type: ADD_DECK_SUCCESS,
    deck
  }
}

export function addCard(deckTitle: string, card) {
  return dispatch =>
    api.addCard(deckTitle, card).then(deck => dispatch(addCardSuccess(deck)))
}

function addCardSuccess(deck) {
  return {
    type: ADD_CARD_SUCCESS,
    deck
  }
}
