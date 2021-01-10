import * as Etebase from 'etebase'
import { TransactionRepository } from './transactionRepository'
import config from '../config'

export const logUserIn = (username: string, passphrase: string): Promise<TransactionRepository> => {
    return Etebase.Account.login(username, passphrase, config.apiUrl)
        .then((etebase: Etebase.Account) => new TransactionRepository(etebase))
}

export const signUserUp = (username: string, email: string, passphrase: string): Promise<TransactionRepository> => {
    return Etebase.Account.signup({ username: username, email: email }, passphrase, config.apiUrl)
        .then(etebase => new TransactionRepository(etebase))
}