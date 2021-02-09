import * as Etebase from 'etebase'
import { TransactionRepository } from './transactionRepository'
import config from '../config'

const SAVED_SESSION_KEY = 'savedSession'

export const createUserSession = (username: string, passphrase: string): Promise<TransactionRepository> => {
    return Etebase.Account.login(username, passphrase, config.apiUrl)
        .then((etebase: Etebase.Account) => {
            etebase.save().then(savedSession => sessionStorage.setItem(SAVED_SESSION_KEY, savedSession))
            return new TransactionRepository(etebase)
        })
}

export const signUserUp = (username: string, email: string, passphrase: string): Promise<TransactionRepository> => {
    return Etebase.Account.signup({ username: username, email: email }, passphrase, config.apiUrl)
        .then(etebase => new TransactionRepository(etebase))
}

export const retrieveUserSession = (): Promise<TransactionRepository | null> => {
    const savedSession = sessionStorage.getItem(SAVED_SESSION_KEY)
    if (!savedSession) return Promise.resolve(null)

    return Etebase.Account.restore(savedSession)
        .then((etebase: Etebase.Account) => new TransactionRepository(etebase))
}



