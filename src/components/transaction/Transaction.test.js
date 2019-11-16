import { mount } from 'enzyme'
import React from 'react'

import { Transaction } from './Transaction'

describe('Transaction Component', () => {
    it('should render without crashing', () => {
        mount(<Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />)
    })

    it('should focus in input on render', () => {
        // Given
        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />

        // When
        const mountWrapper = mount(transactionComponent)

        // Then
        expect(mountWrapper.find('#transaction-input').is(':focus')).toBe(true)
    })

    it('should have an empty amount state on render', () => {
        // Given
        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />

        // When
        const mountWrapper = mount(transactionComponent)

        // Then
        expect(mountWrapper.state('amount')).toEqual("")
    })

    it('should contain an input of type number', () => {
        // Given
        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />

        // When
        const mountWrapper = mount(transactionComponent)

        // Then
        const inputNode = mountWrapper.find('input').first()
        expect(inputNode.prop('type')).toEqual('number')
    })

    it('should set input value according to the amount state', () => {
        // Given
        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />

        // When
        const mountWrapper = mount(transactionComponent)

        // Then
        const inputNode = mountWrapper.find('input').first()
        expect(inputNode.prop('value')).toEqual("")
    })

    it('should update amount state on user input', () => {
        // Given
        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />
        const mountWrapper = mount(transactionComponent)

        // When
        const inputNode = mountWrapper.find('input').first()
        inputNode.simulate('change', { target: { value: "2" } })

        // Then
        expect(mountWrapper.state('amount')).toEqual("2")
    })

    it('should call addToBalance prop when Enter key is pressed in input', () => {
        // Given
        const amountStateValue = "2"

        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />
        const mountWrapper = mount(transactionComponent)
            .setState({ amount: amountStateValue })

        // When
        const inputNode = mountWrapper.find('input').first()
        inputNode.simulate('keyPress', { key: 'Enter' })

        // Then
        expect(mountWrapper.instance().props.addToBalance).toHaveBeenCalledWith(amountStateValue)
    })

    it('should reset amount state to default value when Enter key is pressed in input', () => {
        // Given
        const amountStateValue = "2"

        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />
        const mountWrapper = mount(transactionComponent)
            .setState({ amount: amountStateValue })

        // When
        const inputNode = mountWrapper.find('input').first()
        inputNode.simulate('keyPress', { key: 'Enter' })

        // Then
        expect(mountWrapper.state('amount')).toEqual("")
    })

    it('should select value on input focus', () => {
        // Given
        const transactionComponent = <Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />
        const mountWrapper = mount(transactionComponent)
        const inputNode = mountWrapper.find('input').first()
        inputNode.select = jest.fn()

        // When
        inputNode.simulate('focus', { target: inputNode })

        // Then
        expect(inputNode.select).toHaveBeenCalled()
    })

    describe('validateTransaction', () => {
        it('should add to balance on CREDIT operation', () => {
            // Given
            const amountState = "3"
            const addToBalance = jest.fn()
            const transactionWrapper = mount(<Transaction addToBalance={addToBalance} subtractToBalance={jest.fn()} />)
            transactionWrapper.setState({ amount: amountState })

            // When
            transactionWrapper.instance().validateTransaction('CREDIT')

            // Then
            expect(addToBalance).toHaveBeenCalledWith(amountState)
        })

        it('should subtract to balance on DEBIT operation', () => {
            // Given
            const amountState = "2"
            const subtractToBalance = jest.fn()
            const transactionWrapper = mount(<Transaction addToBalance={jest.fn()} subtractToBalance={subtractToBalance} />)
            transactionWrapper.setState({ amount: amountState })

            // When
            transactionWrapper.instance().validateTransaction('DEBIT')

            // Then
            expect(subtractToBalance).toHaveBeenCalledWith(amountState)
        })

        it('should reset the amount state after transaction', () => {
            // Given
            const amountState = 2
            const transactionWrapper = mount(<Transaction addToBalance={jest.fn()} subtractToBalance={jest.fn()} />)
            transactionWrapper.setState({ amount: amountState })

            // When
            transactionWrapper.instance().validateTransaction('DEBIT')

            // Then
            expect(transactionWrapper.state('amount')).toEqual("")
        })
    })
})