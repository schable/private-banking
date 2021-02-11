import { computeBalanceForBank } from './computeBalances'
import { Bank } from './Bank'
import { Transaction } from './Transaction'

describe('computeBalanceForBank', () => {
    it('should sum all transactions into a total balance number', () => {
        // Given
        const transactions: Transaction[] = [
            new Transaction(10, Bank.Boursorama, new Date(), '+10'),
            new Transaction(-5, Bank.Boursorama, new Date(), '-5'),
            new Transaction(-10, Bank.Boursorama, new Date(), '-10'),
        ]

        // When
        const totalBalance = computeBalanceForBank(Bank.Boursorama, transactions)

        // Then
        expect(totalBalance).toBe(-5)
    })

    it('should sum only transactions of given bank', () => {
        // Given
        const transactions: Transaction[] = [
            new Transaction(10, Bank.Fortuneo, new Date(), '+10'),
            new Transaction(-5, Bank.Fortuneo, new Date(), '-5'),
            new Transaction(-10, Bank.Boursorama, new Date(), '-10'),
        ]

        // When
        const totalBalance = computeBalanceForBank(Bank.Fortuneo, transactions)

        // Then
        expect(totalBalance).toBe(5)
    })
})