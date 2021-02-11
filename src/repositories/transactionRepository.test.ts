import * as Etebase from 'etebase'
import { TransactionRepository } from './transactionRepository'
import config from '../config'

jest.mock('etebase')

const mockedEtebaseAccountGetCollectionManager = Etebase.Account.prototype.getCollectionManager as jest.MockedFunction<typeof Etebase.Account.prototype.getCollectionManager>
const mockedEtebaseCollectionManagerList = Etebase.CollectionManager.prototype.list as jest.MockedFunction<typeof Etebase.CollectionManager.prototype.list>
const mockedEtebaseCollectionManagerGetItemManager = Etebase.CollectionManager.prototype.getItemManager as jest.MockedFunction<typeof Etebase.CollectionManager.prototype.getItemManager>
const mockedEtebaseGetCollectionType = Etebase.Collection.prototype.getCollectionType as jest.MockedFunction<typeof Etebase.Collection.prototype.getCollectionType>
const mockedEtebeaseItemManagerBatch = jest.fn() as jest.MockedFunction<typeof Etebase.ItemManager.prototype.batch>
const mockedEtebeaseItemManagerList = jest.fn() as jest.MockedFunction<typeof Etebase.ItemManager.prototype.list>
const mockedEtebaseItemManagerFetch = jest.fn() as jest.MockedFunction<typeof Etebase.ItemManager.prototype.fetch>
const mockedEtebaseItemGetContent = jest.fn() as jest.MockedFunction<typeof Etebase.Item.prototype.getContent>


describe('getDecryptedTransactions', () => {
    it('should retrieve encrypted items from server', async () => {
        // Given
        const mockedEtebaseItem = {
            getContent: mockedEtebaseItemGetContent.mockResolvedValue('{"amount":-4,"bank":0,"date":"2021-02-07T14:27:30.947Z","description":"Double Expresso","id":""}'),
            isDeleted: false,
            uid: '1234',
        } as jest.Mocked<Etebase.Item>
        const mockedEtebaseCollection = {
            getCollectionType: mockedEtebaseGetCollectionType.mockReturnValue(config.transactionsCollectionType),
        } as jest.Mocked<Etebase.Collection>
        mockedEtebaseCollectionManagerList.mockResolvedValue({
            data: [
                mockedEtebaseCollection,
            ],
            stoken: '',
            done: true,
        })
        mockedEtebaseAccountGetCollectionManager.mockReturnValue({
            list: mockedEtebaseCollectionManagerList,
            getItemManager: mockedEtebaseCollectionManagerGetItemManager,
        } as jest.Mocked<Etebase.CollectionManager>)
        mockedEtebaseCollectionManagerGetItemManager.mockReturnValue({
            // batch: mockedEtebeaseItemManagerBatch,
            // fetch: mockedEtebaseItemManagerFetch,
            list: mockedEtebeaseItemManagerList.mockResolvedValue({
                data: [mockedEtebaseItem],
                stoken: '',
                done: true,
            }),
        } as jest.Mocked<Etebase.ItemManager>)
        const outputString = 1

        mockedEtebaseItemManagerFetch.mockResolvedValue({} as jest.Mocked<Etebase.Item>)

        // When
        const transactions = await new TransactionRepository({getCollectionManager: mockedEtebaseAccountGetCollectionManager} as jest.Mocked<Etebase.Account>).getDecryptedTransactions()

        // Then
        expect(mockedEtebaseAccountGetCollectionManager).toHaveBeenCalledTimes(1)
        expect(mockedEtebaseCollectionManagerList).toHaveBeenCalledWith(config.transactionsCollectionType)
        expect(mockedEtebaseGetCollectionType).toHaveBeenCalledTimes(1)
        expect(mockedEtebaseCollectionManagerGetItemManager).toHaveBeenCalledWith(mockedEtebaseCollection)
        expect(mockedEtebeaseItemManagerList).toHaveBeenCalledTimes(1)
        expect(mockedEtebaseItemGetContent).toHaveBeenCalledWith(outputString)
        expect(transactions[0]).toEqual({
            amount: -4,
            bank: 0,
            date: new Date("2021-02-07T14:27:30.947Z"),
            description: 'Double Expresso',
            id: '1234',
        })
    })
})