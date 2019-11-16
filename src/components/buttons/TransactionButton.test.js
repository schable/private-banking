import { shallow } from 'enzyme'
import React from 'react'
import { TransactionButton } from './TransactionButton'

describe('TransactionButton component', () => {
    it('should display operator prop in the button', () => {
        // Given
        const operator = '+'

        // When
        const shallowWrapper = shallow(<TransactionButton makeTransaction={jest.fn()} operator={operator} />)

        // Then
        expect(shallowWrapper.find('button').first().text()).toEqual(operator)
    })

    it('should call makeTransaction prop on button click', () => {
        // Given
        const makeTransaction = jest.fn()
        const shallowWrapper = shallow(<TransactionButton makeTransaction={makeTransaction} operator={'+'} />)

        // When
        shallowWrapper.find('button').first().simulate('click')

        // Then
        expect(makeTransaction).toHaveBeenCalledTimes(1)
    })
})
