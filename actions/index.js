import * as api from '../utils/api'

export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS'

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
