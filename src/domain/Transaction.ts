import { Bank } from './Bank'

export class Transaction {
    amount: number
    bank: Bank
    date: Date
    description: string
    id: string

    private static readonly NEW_TRANSACTION_ID = ''

    constructor(amount: number, bank: Bank, date: Date, description: string, id: string = Transaction.NEW_TRANSACTION_ID) {
        this.amount = amount
        this.bank = bank
        this.date = date
        this.description = description
        this.id = id
    }
}