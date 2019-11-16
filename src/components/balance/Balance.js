import React from 'react'
import './Balance.css'

export const Balance = ({ balance }) => (
    <div id={'balance-container'}>
        <p>{balance}<span id={'currency'}>€</span></p>
    </div>)
