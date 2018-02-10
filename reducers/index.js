import {
  FETCH_DECKS_SUCCESS,
  FETCH_DECK_BY_ID_SUCCESS,
} from '../actions'

export default function decks(state = { decks: [] }, action) {
  switch (action.type) {
    case FETCH_DECKS_SUCCESS:
      return {
        decks: action.decks
      }
    case FETCH_DECK_BY_ID_SUCCESS:
      return {
        ...state,
        selectedDeck: action.deck
      }
    default:
      return state
  }
}
