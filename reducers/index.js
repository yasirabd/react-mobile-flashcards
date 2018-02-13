import {
  FETCH_DECKS_SUCCESS,
  FETCH_DECK_BY_ID_SUCCESS,
  ADD_DECK_SUCCESS,
  ADD_CARD_SUCCESS,
} from '../actions'

export default function decks(state = { decks: [], selectedDeck: null }, action) {
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
    case ADD_DECK_SUCCESS:
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.deck,
        }
      }
    case ADD_CARD_SUCCESS:
      const updatedDeck = action.deck
      return {
        ...state,
        decks: {
          ...state.decks,
          [updatedDeck.title]: updatedDeck
        },
        selectedDeck: updatedDeck
      }
    default:
      return state
  }
}
