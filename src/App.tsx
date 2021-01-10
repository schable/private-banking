import React from 'react'
import { useState } from 'react'
import './App.css'
import { SignUp } from './pages/SignUp'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { TransactionRepository } from './repositories/transactionRepository'

const App = () => {
  const [transactionRepository, setTransactionRepository] = useState<TransactionRepository | undefined>()
 
  return transactionRepository
    ? <Home transactionRepository={transactionRepository}/>
    : (
      <>
        <SignIn setTransactionRepository={setTransactionRepository} />
        <SignUp setTransactionRepository={setTransactionRepository} />
      </>
    )
}

export default App

