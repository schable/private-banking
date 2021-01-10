import { TransactionForm } from '../components/TransactionForm'
import React, { useEffect, useState } from 'react'
import { TransactionRepository } from '../repositories/transactionRepository'
import { Transaction } from '../domain/Transaction'
import { Transactions } from '../components/Transactions'
import { AccountsBalances } from '../components/AccountsBalances'
import { Loader } from '../components/Loader'

export const Home = (prop: { transactionRepository: TransactionRepository }): JSX.Element => {
    const [transactions, setTransactions] = useState<Array<Transaction>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect((): void => {
        prop.transactionRepository.getDecryptedTransactions()
            .then(transactions => {
                setTransactions(transactions)
                setIsLoading(false)
            })
    }, [prop.transactionRepository])

    const saveNewTransaction = (newTransaction: Transaction): void => {
        setIsLoading(true)
        prop.transactionRepository
            .saveEncryptedTransaction(newTransaction)
            .then((savedTransaction: Transaction | undefined): void => {
            setIsLoading(false)
            savedTransaction && setTransactions([...transactions, savedTransaction])
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

    return isLoading
        ? <Loader />
        : (
            <>
                <TransactionForm submitTransaction={saveNewTransaction} />
                <Transactions deleteTransaction={deleteTransaction} transactions={transactions} />
                <AccountsBalances transactions={transactions} />
            </>
        )

}