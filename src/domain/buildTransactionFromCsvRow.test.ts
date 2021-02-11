import { buildTransactionFromCsvRow, csvTransactionData } from './buildTransactionFromCsvRow'
import { Transaction } from './Transaction'

describe('build transaction from csv row', () => {
    let expectedTransaction: Transaction
    beforeEach(() => {
        expectedTransaction = new Transaction(
            3.6,
            0,
            new Date(2021, 0, 24),
            'Double expresso',
        )
    })

    it('should build bank transaction from csv row data', () => {
        // Given
        const csvRow: csvTransactionData = {
            amount: '3.6',
            bank: '0',
            date: '2021-01-24',
            description: 'Double expresso',
        }

        // When
        const builtTransaction = buildTransactionFromCsvRow(csvRow)

        // Then
        expect(builtTransaction).toEqual(expectedTransaction)
    })

    it('should replace comma indicating decimals by dot in amount', () => {
        // Given
        const csvRow: csvTransactionData = {
            amount: '3,6',
            bank: '0',
            date: '2021-01-24',
            description: 'Double expresso',
        }

        // When
        const builtTransaction = buildTransactionFromCsvRow(csvRow)

        // Then
        expect(builtTransaction).toEqual(expectedTransaction)
    })

    it('should delete non-breaking space acting as thousand divider in amount', () => {
        // Given
        const csvRow: csvTransactionData = {
            amount: '3\u00a0600',
            bank: '0',
            date: '2021-01-24',
            description: 'Double expresso',
        }
        expectedTransaction.amount = 3600

        // When
        const builtTransaction = buildTransactionFromCsvRow(csvRow)

        // Then
        expect(builtTransaction).toEqual(expectedTransaction)
    })
})