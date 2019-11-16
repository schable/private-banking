import { ADD_TO_BALANCE, SUBTRACT_TO_BALANCE } from './types'

export const addToBalance = (amount) => ({ type: ADD_TO_BALANCE, amount: Number(amount) })

export const subtractToBalance = (amount) => ({ type: SUBTRACT_TO_BALANCE, amount: Number(amount) })