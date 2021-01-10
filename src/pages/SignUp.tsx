import React from "react"
import { useState } from "react"
import { signUserUp } from "../repositories/userRepository"
import { TransactionRepository } from "../repositories/transactionRepository"

export const SignUp = (props: { setTransactionRepository: (transactionRepository: TransactionRepository) => void }): JSX.Element => {
    const [passphrase, setPassphrase] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        switch (event.target.name) {
            case 'passphrase':
                setPassphrase(event.target.value)
                break
            case 'username':
                setUsername(event.target.value)
                break
            case 'email':
                setEmail(event.target.value)
                break
        }
    }

    const signUp = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        signUserUp(username, email, passphrase).then((transactionRepository: TransactionRepository): void => {
            props.setTransactionRepository(transactionRepository)
        })
    }

    return (
        <form onSubmit={signUp}>
            <h1>{'S\'enregistrer'}</h1>
            <label>
                {'Nom d\'utilisateur'}
                <input onChange={onInputChange} name="username" type="text" value={username} ></input>
            </label>
            <label>
                {'Adresse e-mail'}
                <input onChange={onInputChange} name="email" type="text" value={email} />
            </label>
            <label>
                {'Phrase de passe'}
                <input onChange={onInputChange} name="passphrase" type="password" value={passphrase} />
            </label>
            <input type="submit" value="Valider" />
        </form>
    )
}