import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {act} from 'react-dom/test-utils'
import '@testing-library/jest-dom';
import Signin from './Signin'

const mockThen = jest.fn()

jest.mock('./api-auth', () => ({
    signin: () => ({
        then: mockThen
    })
}))

jest.mock('./auth-helper', () => ({
    authenticate: jest.fn()
}))

const TEST_INPUT_DATA = {
    EMAIL: 'test@mail.ru',
    PASSWORD: 'test123',
}

describe('<Signin /> test', () => {
    const Component = () => render(<Signin />)

    it('should be mount snap', () => {
        expect(Component()).toMatchSnapshot()
    })

    it('input form data', async () => {
        Component()
        const EmailInput = screen.getByPlaceholderText('Email')
        const PasswordInput = screen.getByPlaceholderText('Password')
        act(() => {
            fireEvent.change(EmailInput, { target: { value: TEST_INPUT_DATA.EMAIL } })
        })
        act(() => {
            fireEvent.change(PasswordInput, { target: { value: TEST_INPUT_DATA.PASSWORD } })
        })
        expect(screen.getByDisplayValue(TEST_INPUT_DATA.EMAIL)).toBeTruthy()
        expect(screen.getByDisplayValue(TEST_INPUT_DATA.PASSWORD)).toBeTruthy()

        act(() => {
            fireEvent.click(screen.getByText('Submit'))
        })

        await waitFor(() => expect(mockThen).toBeCalledTimes(1))
    })
})
