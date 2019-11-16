import React from 'react'
import './App.css'
import { BalanceContainer } from './components/balance/BalanceContainer'
import { TransactionContainer } from './components/transaction/TransactionContainer'
import * as PropTypes from 'prop-types'

const App = () => (
    <div className="App">
        <BalanceContainer />
        <TransactionContainer />
    </div>
)

App.propTypes = { store: PropTypes.any }

export default App
