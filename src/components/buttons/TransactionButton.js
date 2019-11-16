import * as PropTypes from 'prop-types'
import React from 'react'

import './TransactionButton.css'

export const TransactionButton = props => (<button id={'transaction-button'} onClick={props.makeTransaction}>{props.operator}</button>)

TransactionButton.propTypes = { makeTransaction: PropTypes.func, operator: PropTypes.string }