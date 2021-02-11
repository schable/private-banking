import * as Etebase from 'etebase'
import { createUserSession, retrieveUserSession } from './userRepository'
import config from '../config'
import { TransactionRepository } from './transactionRepository'

jest.mock('etebase')

const mockedEtebaseAccountLogin = Etebase.Account.login as jest.MockedFunction<typeof Etebase.Account.login>
const mockedEtebaseAccountRestore = Etebase.Account.restore as jest.MockedFunction<typeof Etebase.Account.restore>
const mockedEtebaseAccountSave = Etebase.Account.prototype.save as jest.MockedFunction<typeof Etebase.Account.prototype.save>
describe('createUserSession', () => {
    beforeEach(() => {
        mockedEtebaseAccountLogin.mockResolvedValue({
            save: mockedEtebaseAccountSave.mockResolvedValue('savedUserSession'),
        } as jest.Mocked<Etebase.Account>)
        /* there is no way to distinguish sessionStorage from localStorage with this spy
         * see https://github.com/facebook/jest/issues/6798
         */
        jest.spyOn(Storage.prototype, 'setItem')
    })

    it('should log user in', async () => {
        // Given
        const username = 'username'
        const passphrase = 'passphrase'

        // When
        await createUserSession(username, passphrase)

        // Then
        expect(mockedEtebaseAccountLogin).toHaveBeenCalledWith(username, passphrase, config.apiUrl)
    })

    it('should save logged in user session', async () => {
        // Given
        const username = 'username'
        const passphrase = 'passphrase'

        // When
        await createUserSession(username, passphrase)

        // Then
        expect(mockedEtebaseAccountSave).toHaveBeenCalledTimes(1)
        expect(sessionStorage.setItem).toHaveBeenCalledWith('savedSession', 'savedUserSession')
    })

    it('should instantiate user\'s transactions repository', async () => {
        // Given
        const username = 'username'
        const passphrase = 'passphrase'

        // When
        const transactionRepository = await createUserSession(username, passphrase)

        // Then
        expect(transactionRepository).toBeInstanceOf(TransactionRepository)
    })
})

describe('retrieveUserSession', () => {
    beforeEach(() => {
        mockedEtebaseAccountRestore.mockResolvedValue({} as jest.Mocked<Etebase.Account>)
        /* there is no way to distinguish sessionStorage from localStorage with this spy
         * see https://github.com/facebook/jest/issues/6798
         */
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'savedUserSession')
    })

    it('should retrieve saved user session', async () => {
        // When
        await retrieveUserSession()

        // Then
        expect(sessionStorage.getItem).toHaveBeenCalledWith('savedSession')
    })

    it('should instantiate user\'s transactions repository', async () => {
        // Given

        // When
        const transactionRepository = await retrieveUserSession()

        // Then
        expect(transactionRepository).toBeInstanceOf(TransactionRepository)
    })

    it('should not return user\'s transactions repository if no saved session', async () => {
        // Given
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null)

        // When
        const transactionRepository = await retrieveUserSession()

        // Then
        expect(transactionRepository).toBeNull()
    })

    it('should throw error if cannot restore existing session', async () => {
        // Given
        expect.assertions(1)
        mockedEtebaseAccountRestore.mockRejectedValue('mocked error message')

        // When
        try {
            await retrieveUserSession()
        }

        // Then
        catch (error) {
            expect(error.message).toBe('Error occurred while trying to restore saved session. Error: mocked error message')
        }

    })
})
