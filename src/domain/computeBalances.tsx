import { Transaction } from './Transaction'
import { Bank } from './Bank'

const bankIndexes = Object.values(Bank).filter(key => typeof key === 'number')
const bankValues = Object.values(Bank).filter((key: unknown): boolean => typeof key === 'string')

export const computeBalanceForBank = (bank: Bank, transactions: Transaction[]): number => transactions.reduce(
    (accumulator: number, transaction: Transaction): number => transaction.bank === bank ? accumulator + transaction.amount : accumulator,
    0,
)
