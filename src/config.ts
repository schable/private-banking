type Config = {
    apiUrl: string,
    transactionsCollectionType: string,
}

const config: Config = {
    apiUrl: process.env.REACT_APP_API_URL || '',
    transactionsCollectionType: process.env.REACT_APP_TRANSACTIONS_COLLECTION_TYPE || '',
}

export default config