import * as PropTypes from 'prop-types'
import React from 'react'
import './App.css'
import { BalanceContainer } from './components/balance/BalanceContainer'
import { Login } from './components/Login'
import { TransactionContainer } from './components/transaction/TransactionContainer'

const App = () => (
    <div className="App">
        <Login>
            <BalanceContainer />
            <TransactionContainer />
        </Login>
    </div>
)

App.propTypes = { store: PropTypes.any }

export default App
