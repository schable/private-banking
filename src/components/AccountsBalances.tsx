import React, { useMemo } from 'react'
import { Transaction } from '../domain/Transaction'
import { Bank } from '../domain/Bank'
import { computeBalanceForBank } from '../domain/computeBalances'

export const AccountsBalances = (props: { transactions: Transaction[] }): JSX.Element => {
    const totalBoursorama: number = useMemo(() => computeBalanceForBank(Bank.Boursorama, props.transactions), [props.transactions])

    const totalFortuneo: number = useMemo(() => computeBalanceForBank(Bank.Fortuneo, props.transactions), [props.transactions])

    const totalBalance: number = totalBoursorama + totalFortuneo

    return (
        <>
            <p>{`Total : ${totalBalance}`}</p>
            <p>{'Sous-totaux :'}</p>
            <ul>
                <li>{`${Bank[Bank.Boursorama]} : ${totalBoursorama}`}</li>
                <li>{`${Bank[Bank.Fortuneo]} : ${totalFortuneo}`}</li>
            </ul>
        </>

    )
}

