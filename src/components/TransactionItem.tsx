import { Transaction } from '../domain/Transaction'

export const TransactionItem = (props: { deleteTransaction: (transactionId: string) => void, transaction: Transaction }) => {
    return (
        <tr>
            <td>{props.transaction.date.toLocaleDateString()}</td>
            <td>{props.transaction.description}</td>
            <td>{props.transaction.amount}</td>
            <td>
                <button
                    onClick={() => props.deleteTransaction(props.transaction.id)}
                    type="button"
                >{'Supprimer'}</button>
            </td>
        </tr>
    )
}