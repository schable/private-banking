import React, { PureComponent } from 'react'
import { generateUnencryptedMasterKey } from '../encryption'

export class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false,
            masterPassword: ''
        }
        this.memorizePassword = this.memorizePassword.bind(this)
    }

    memorizePassword(event) {
        event.preventDefault()

        generateUnencryptedMasterKey(this.state.masterPassword)
            .then(key => console.log(key))
    }

    render() {
        if (this.state.isAuthenticated)
            return <>
                {this.props.children}
            </>
        else
            return <>
                <h1>Password</h1>
                <form onSubmit={this.memorizePassword}>
                    <input
                        type='password'
                        value={this.state.masterPassword}
                        onChange={(event) => this.setState({masterPassword: event.target.value})}/>
                    <button type='submit'>OK</button>
                </form>
            </>
    }
}