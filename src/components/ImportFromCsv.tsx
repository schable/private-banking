import React, { useEffect, useRef, useState } from 'react'
import { Loader } from './Loader'
import { buildTransactionFromCsvRow } from '../domain/buildTransactionFromCsvRow'
import { Transaction } from '../domain/Transaction'

const csvParser = require('papaparse')

export type csvTransactionRow = {
    Amount: string,
    Bank: string,
    Date: string,
    Description: string,
}

type ImportFromCsvProps = { saveTransactions: (newTransaction: Transaction[]) => void }

export const ImportFromCsv = (props: ImportFromCsvProps): JSX.Element => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [importedTransactions, setImportedTransactions] = useState<Transaction[]>([])
    const [hasCompleted, setHasCompleted] = useState<boolean>(false)

    const addTransactionFromCsvRow = (row: { data: csvTransactionRow }) => {
        const csvTransactionRow: csvTransactionRow = row.data
        const csvTransactionData = {
            amount: csvTransactionRow.Amount,
            bank: csvTransactionRow.Bank,
            date: csvTransactionRow.Date,
            description: csvTransactionRow.Description,
        }
        const importedTransaction: Transaction = buildTransactionFromCsvRow(csvTransactionData)
        setImportedTransactions(importedTransactions => [...importedTransactions, importedTransaction])
    }

    const endImport = () => setHasCompleted(true)

    useEffect(() => {
        if (!hasCompleted) return
        props.saveTransactions(importedTransactions)
        setIsLoading(false)
    }, [hasCompleted, importedTransactions, props])

    const handleClick = () => {
        if (fileInputRef.current?.files) {
            setIsLoading(true)
            const csvParserConfig = {
                step: addTransactionFromCsvRow,
                complete: endImport,
                header: true,
                skipEmptyLines: 'greedy',
                error: (error: { message: string, code: string, type: string, row: number }) => console.log({ error: error.message })
            }
            fileInputRef.current.files[0] && csvParser.parse(
                fileInputRef.current.files[0],
                csvParserConfig
            )
        }
    }

    return (
        isLoading
            ? <Loader />
            : <>
                <input accept="text/csv" ref={fileInputRef} type="file" />
                <button type="submit" onClick={handleClick}>{'Importer'}</button>
            </>
    )
}