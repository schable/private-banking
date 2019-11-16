import { ADD_TO_BALANCE, SUBTRACT_TO_BALANCE } from '../actions/types'

export const balanceReducer = (state = { balance: 0 }, action) => {
    switch (action.type) {
        case ADD_TO_BALANCE:
            return { balance: state.balance + action.amount }
        case SUBTRACT_TO_BALANCE:
            return { balance: state.balance - action.amount }
        default:
            return { balance: state.balance }
    }
}