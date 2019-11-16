import { shallow } from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'
import { Balance } from './Balance'

describe('Balance component', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Balance />, div)
    })

    it('should display balance prop in p element with added euro currency symbol', () => {
        // Given
        const balance = '2390'

        // When
        const shallowWrapper = shallow(<Balance balance={balance} />)

        // Then
        expect(shallowWrapper.find('p').first().text()).toEqual(`${balance}€`)
    })
})