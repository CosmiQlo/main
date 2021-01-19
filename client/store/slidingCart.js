/*** ACTION TYPES ***/
const TOGGLE = 'TOGGLE'

/*** INITIAL STATE ***/
const initialState = false

/*** ACTION CREATORS ***/
export const toggleCart = () => ({type: TOGGLE})

/*** REDUCERS ***/
export default function slidingCartReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE:
      return !state
    default:
      return state
  }
}
