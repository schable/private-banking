import * as PropTypes from 'prop-types'
import React, { PureComponent, createRef } from 'react'
import { TransactionTypes } from '../../domain/TransactionTypes'
import { TransactionButton } from '../buttons/TransactionButton'
import './Transaction.css'

const ENTER_KEY = 'Enter'
const { CREDIT, DEBIT } = TransactionTypes

export class Transaction extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            amount: ''
        }
        this.amountInput = createRef()
    }

    componentDidMount() {
        this.amountInput.current.focus()
    }

    updateTransactionAmount(event) {
        this.setState({ amount: event.target.value })
    }

    addToBalanceOnEnter(event) {
        if (event.key === ENTER_KEY) {
            this.validateTransaction(CREDIT)
        }
    }

    validateTransaction(operation) {
        operation === DEBIT
            ? this.props.subtractToBalance(this.state.amount)
            : this.props.addToBalance(this.state.amount)

        this.setState(() => ({ amount: '' }))
    }

    render() {
        return <div id={'transaction-container'}>
            <input id={'transaction-input'}
                   onChange={event => this.updateTransactionAmount(event)}
                   onKeyPress={event => this.addToBalanceOnEnter(event)}
                   onFocus={event => event.target.select()}
                   value={this.state.amount}
                   type={'number'}
                   ref={this.amountInput}
            />
            <div id={'transaction-button-container'}>
                <TransactionButton makeTransaction={() => this.validateTransaction(DEBIT)} operator={'-'} />
                <TransactionButton makeTransaction={() => this.validateTransaction(CREDIT)} operator={'+'} />
            </div>
        </div>
    }
}

Transaction.propTypes = {
    addToBalance: PropTypes.func.isRequired,
    subtractToBalance: PropTypes.func.isRequired
}