import { Transaction } from './Transaction'
import { Bank } from './Bank'

export const computeBalanceForBank = (bank: Bank, transactions: Transaction[]): number => {
    return transactions.reduce(
        (accumulator: number, transaction: Transaction): number => {
            return transaction.bank === bank ? accumulator + transaction.amount : accumulator
        },
        0,
    )
}
