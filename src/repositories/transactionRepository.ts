import { Transaction } from '../domain/Transaction'
import * as Etebase from 'etebase'
import config from '../config'

export class TransactionRepository {
    private userAccount: Etebase.Account

    constructor(userAccount: Etebase.Account) {
        this.userAccount = userAccount
    }

    public TRANSACTIONS_COLLECTION_NAME: string = 'Bank transactions'

    public async getDecryptedTransactions(): Promise<Transaction[]> {
        const collectionManager = this.userAccount.getCollectionManager()
        const items: Etebase.Item[] = await this._getEncryptedItems(collectionManager)
        const nonDeletedItems = items.filter((item: Etebase.Item): boolean => !item.isDeleted)
        const transactionsContentAndId: Promise<[string, string]>[] = nonDeletedItems.map(async (item: Etebase.Item): Promise<[string, string]> => [await item.getContent(Etebase.OutputFormat.String), item.uid])
        const resolvedTransactionsContentAndId: [string, string][] = await Promise.all(transactionsContentAndId)
        return resolvedTransactionsContentAndId.map((transactionContentAndId: [string, string]): Transaction => {
            const stringifiedTransactionContent = transactionContentAndId[0]
            const transactionId = transactionContentAndId[1]
            return TransactionRepository._buildTransaction(transactionId, stringifiedTransactionContent)
        })
    }

    public async saveEncryptedTransaction(transaction: Transaction): Promise<Transaction | undefined> {
        const collectionManager = this.userAccount.getCollectionManager()
        const transactionsCollection = await this._getTransactionsCollection(collectionManager)
        const itemManager = collectionManager.getItemManager(transactionsCollection)

        const item = await itemManager.create(
            {
                mtime: new Date().getTime(),
            },
            JSON.stringify(transaction),
        )
        await itemManager.batch([item])
        const stringifiedCreatedTransaction = await item.getContent(Etebase.OutputFormat.String)
        const createdTransactionId = item.uid
        return TransactionRepository._buildTransaction(createdTransactionId, stringifiedCreatedTransaction)
    }

    public async deleteTransaction(transactionId: string | null): Promise<void> {
        if (transactionId) {
            const collectionManager = this.userAccount.getCollectionManager()
            const transactionsCollection = await this._getTransactionsCollection(collectionManager)
            const itemManager = collectionManager.getItemManager(transactionsCollection)
            const item = await itemManager.fetch(transactionId)
            item.delete()
            await itemManager.batch([item])
        }
    }

    private static _buildTransaction(transactionId: string, transactionContent: string): Transaction {
        const parsedTransactionContent = JSON.parse(transactionContent)
        const transactionDate = new Date(parsedTransactionContent.date)
        return new Transaction(
            parsedTransactionContent.amount,
            parsedTransactionContent.bank,
            transactionDate,
            parsedTransactionContent.description,
            transactionId,
        )
    }

    private async _getTransactionsCollection(collectionManager: Etebase.CollectionManager): Promise<Etebase.Collection> {
        const collectionsContainer = await collectionManager.list(config.transactionsCollectionType)
        const transactionsCollection = collectionsContainer.data.find(collection => collection.getCollectionType() === config.transactionsCollectionType)
        if (transactionsCollection) {
            return transactionsCollection
        } else {
            const collection = await collectionManager.create(config.transactionsCollectionType, { name: this.TRANSACTIONS_COLLECTION_NAME }, '')
            await collectionManager.upload(collection)
            return collection
        }
    }

    private async _getEncryptedItems(collectionManager: Etebase.CollectionManager): Promise<Etebase.Item[]> {
        const transactionsCollection = await this._getTransactionsCollection(collectionManager)
        const itemManager = collectionManager.getItemManager(transactionsCollection)
        const itemsContainer = await itemManager.list()
        return itemsContainer.data
    }
}