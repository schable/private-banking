import React from 'react'
import { Transaction } from '../domain/Transaction'
import { TransactionItem } from './TransactionItem'

export const Transactions = (props: { deleteTransaction: (transactionId: string) => void, transactions: Transaction[] }): JSX.Element => {
    return (
        <table>
            <thead>
            <tr>
                <th>{'Date'}</th>
                <th>{'Description'}</th>
                <th>{'Montant'}</th>
            </tr>
            </thead>
            <tbody>
            {
                props.transactions
                    .map(transaction => <TransactionItem
                        deleteTransaction={props.deleteTransaction}
                        key={transaction.id} transaction={transaction}
                    />)
            }
            </tbody>
        </table>
    )
}