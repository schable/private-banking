import { TransactionForm } from '../components/TransactionForm'
import React, { useEffect, useState } from 'react'
import { TransactionRepository } from '../repositories/transactionRepository'
import { Transaction } from '../domain/Transaction'
import { Transactions } from '../components/Transactions'
import { AccountsBalances } from '../components/AccountsBalances'
import { Loader } from '../components/Loader'
import { ImportFromCsv } from '../components/ImportFromCsv'

export const Home = (prop: { transactionRepository: TransactionRepository }): JSX.Element => {
    const [transactions, setTransactions] = useState<Array<Transaction>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect((): void => {
        prop.transactionRepository.getAllDecryptedTransactions()
            .then(transactions => {
                setTransactions(transactions)
                setIsLoading(false)
            })
    }, [prop.transactionRepository])

    const saveNewTransactions = (newTransactions: Transaction[]): void => {
        setIsLoading(true)
        prop.transactionRepository
            .saveEncryptedTransactions(newTransactions)
            .then((savedTransactions: Transaction[]): void => {
                setIsLoading(false)
                savedTransactions && setTransactions([...transactions, ...savedTransactions])
            })
    }

    const deleteTransaction = (transactionId: string): void => {
        setIsLoading(true)
        prop.transactionRepository.deleteTransaction(transactionId)
            .then(() => {
                const transactionToDeleteIndex: number = transactions.findIndex(transaction => transaction.id === transactionId)
                let remainingTransactions = [...transactions]
                remainingTransactions.splice(transactionToDeleteIndex, 1)
                setTransactions(remainingTransactions)
                setIsLoading(false)
            })
    }

    const deleteAllTransactions = () => {
        setIsLoading(true)
        prop.transactionRepository.deleteAllTransactions()
            .then(() => setIsLoading(false))
    }

    return isLoading
        ? <Loader />
        : (
            <>
                <TransactionForm submitTransaction={saveNewTransactions} />
                <Transactions deleteTransaction={deleteTransaction} transactions={transactions} />
                <AccountsBalances transactions={transactions} />
                <p>Nb de transactions: {transactions.length}</p>
                <button onClick={deleteAllTransactions} type="button">
                    {'ATTENTION: Supprimer toutes les transactions'}
                </button>
                <ImportFromCsv saveTransactions={saveNewTransactions} />
            </>
        )

}