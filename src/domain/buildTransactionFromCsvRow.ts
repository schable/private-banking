import { Transaction } from './Transaction'

export type csvTransactionData = {
    amount: string,
    bank: string,
    date: string,
    description: string,
}

const NON_BREAKING_SPACE = '\u00A0'

const _sanitizeNumberString = (numberString: string): string => numberString
    .replace(',', '.')
    .replace(NON_BREAKING_SPACE, '')

export const buildTransactionFromCsvRow = (csvTransactionData: csvTransactionData): Transaction => {
    const amount: number = Number(_sanitizeNumberString(csvTransactionData.amount))
    const bank = Number(csvTransactionData.bank)
    const date = new Date(csvTransactionData.date)
    const description = csvTransactionData.description

    return new Transaction(amount, bank, date, description)
}