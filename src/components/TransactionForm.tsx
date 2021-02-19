import React, { useState } from 'react'
import { Bank } from '../domain/Bank'
import { Transaction } from '../domain/Transaction'

const getTwoDigitNumber = (number: number): string => {
    return number < 10 ? `0${number}` : `${number}`
}

type TransactionFormProps = { submitTransaction: (newTransaction: Transaction[]) => void }

export const TransactionForm = (prop: TransactionFormProps): JSX.Element => {
    const [amount, setAmount] = useState<string>('')
    const [date, setDate] = useState<Date>(new Date())
    const [description, setDescription] = useState<string>('')

    const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAmount(event.target.value)
    }

    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDate(event.target.valueAsDate || new Date())
    }

    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value)
    }

    const onTransactionValidation = (bank: Bank) => () => {
        const newTransaction = new Transaction(Number(amount), bank, date, description)
        prop.submitTransaction([newTransaction])
    }

    const dateFieldValue = `${date.getFullYear()}-${getTwoDigitNumber(date.getMonth() + 1)}-${getTwoDigitNumber(date.getDate())}`

    return (
        <>
            <label>
                {'Montant'}
                <input onChange={onAmountChange} type="number" value={amount} />
            </label>
            <label>
                {'Date'}
                <input onChange={onDateChange} type="date" value={dateFieldValue} />
            </label>
            <label>
                {'Description'}
                <input onChange={onDescriptionChange} type="text" value={description} />
            </label>
            <button onClick={onTransactionValidation(Bank.Boursorama)} type="button">{'Boursorama'}</button>
            <button onClick={onTransactionValidation(Bank.Fortuneo)} type="button">{'Fortuneo'}</button>
        </>
    )
}

