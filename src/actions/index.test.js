import { addToBalance, subtractToBalance } from './index'
import { ADD_TO_BALANCE, SUBTRACT_TO_BALANCE } from './types'

describe('addToBalance', () => {
    it('should create ADD_TO_BALANCE action', () => {
        // When
        const action = addToBalance(3)

        // Then
        expect(action).toStrictEqual({ type: 'ADD_TO_BALANCE', amount: 3 })
    })

    it('should cast amount to a number', () => {
        // When
        const action = addToBalance('3')

        // Then
        expect(action).toStrictEqual({ type: 'ADD_TO_BALANCE', amount: 3 })
    })
})

describe('subtractToBalance', () => {
    it('should create SUBTRACT_TO_BALANCE action', () => {
        // When
        const action = subtractToBalance(3)

        // Then
        expect(action).toStrictEqual({ type: 'SUBTRACT_TO_BALANCE', amount: 3 })
    })

    it('should cast amount to a number', () => {
        // When
        const action = subtractToBalance('3')

        // Then
        expect(action).toStrictEqual({ type: 'SUBTRACT_TO_BALANCE', amount: 3 })
    })
})