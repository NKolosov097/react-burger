import { UPDATE_TYPE } from '../actions/DnD-action'

const initialState = {
    boards: ['default', 'buns', 'mains'],
}

// eslint-disable-next-line
export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TYPE: {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}
