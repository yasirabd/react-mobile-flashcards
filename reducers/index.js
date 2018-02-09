import { FETCH_DECKS_SUCCESS } from '../actions'

export default function decks(state = { decks: [] }, action) {
  switch (action.type) {
    case FETCH_DECKS_SUCCESS:
      return {
        decks: action.decks
      }
    default:
      return state
  }
}
