import { addToBalance } from '../actions'
import { balanceReducer } from './index'

describe('balanceReducer', () => {
    it('should set an initial amount to 0 and return it when no action', () => {
        // Given
        const unknownAction = { type: 'unknown action' }

        // When
        const store = balanceReducer(undefined, unknownAction)

        // Then
        expect(store.balance).toEqual(0)
    })

    it('should add the amount to the balance when addToBalance action occurs', () => {
        // Given
        const initialBalanceAtThree = { balance: 3 }
        const addFiveToBalanceAction = addToBalance(5)

        // When
        const store = balanceReducer(initialBalanceAtThree, addFiveToBalanceAction)

        // Then
        expect(store.balance).toEqual(8)
    })

    it('should subtract the amount to the balance when subtractToBalance action occurs', () => {
        // Given
        const initialBalanceAtThree = { balance: 3 }
        const subtractFourToBalanceAction = addToBalance(-4)

        // When
        const store = balanceReducer(initialBalanceAtThree, subtractFourToBalanceAction)

        // Then
        expect(store.balance).toEqual(-1)
    })
})