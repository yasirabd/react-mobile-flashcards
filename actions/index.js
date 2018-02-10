import * as api from '../utils/api'

export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS'
export const FETCH_DECK_BY_ID_SUCCESS = 'FETCH_DECK_BY_ID_SUCCESS'

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
