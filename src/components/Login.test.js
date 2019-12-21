import { mount, shallow } from 'enzyme'
import React from 'react'
import { Login } from './Login'

describe('Login', () => {
    it('should render without crashing', () => {
        mount(<Login />)
    })

    it('should not authenticate user by default', () => {
        // When
        const wrapper = shallow(<Login />)

        // Then
        expect(wrapper.state('isAuthenticated')).toBe(false)
    })

    it('should render a password field for user to authenticate if not already', () => {
        // When
        const wrapper = shallow(<Login />)

        // Then
        expect(wrapper.exists("input[type='password']")).toBe(true)
    })

    it('should not render children if user not authenticated', () => {
        // When
        const wrapper = shallow(<Login><div id='child'/></Login>)

        // Then
        expect(wrapper.exists('#div')).toBe(false)
    })

    it('should render its children elements if user is authenticated', () => {
        // When
        const wrapper = shallow(<Login><div id='child'/></Login>)
        wrapper.setState({ isAuthenticated: true })

        // Then
        expect(wrapper.exists('#child')).toBe(true)
    })

    it('should not render password field if user is already authenticated', () => {
        // When
        const wrapper = shallow(<Login><div id='child'/></Login>)
        wrapper.setState({ isAuthenticated: true })

        // Then
        expect(wrapper.exists("input[type='password']")).toBe(false)
    })
})