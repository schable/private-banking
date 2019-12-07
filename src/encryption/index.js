import { decrypt, decryptMasterKey, encrypt, genEncryptedMasterKey, updatePassphraseKey } from 'easy-web-crypto'

export const encryptAndDecrypt = async data => {
    const passphrase = 'superPassPhrase'

    const unencryptedTransaction = data
    console.log('unencryptedTransaction', unencryptedTransaction)

    // derive a new key from passphrase and generate the master AES key
    // can be safely stored
    const encryptedMasterAESKey = await genEncryptedMasterKey(passphrase)


    ////////////////////////
    // decrypt the AES key
    let decryptedMasterAESKey = await decryptMasterKey(passphrase, encryptedMasterAESKey)

    // using the key generated above
    const encryptedTransaction = await encrypt(decryptedMasterAESKey, unencryptedTransaction)
    console.log('encryptedTransaction:', encryptedTransaction)
    /////////////////////


    // decrypt the data
    let decryptedTransaction = await decrypt(decryptedMasterAESKey, encryptedTransaction)
    console.log('decryptedTransaction:', decryptedTransaction)

    // // change passphrase
    // const newPassphrase = 'something different from the last passphrase'
    //
    // // updatePassphraseKey(oldassphrase, newPassphrase, oldEncryptedMasterKey)
    // const updatedEncMK = await updatePassphraseKey(passphrase, newPassphrase, encryptedMasterAESKey)
    //
    // // decrypt new master key
    // decryptedMasterAESKey = await decryptMasterKey(newPassphrase, updatedEncMK)
    //
    // // decrypt the previous data
    // decryptedTransaction = await decrypt(decryptedMasterAESKey, encryptedTransaction)
    // console.log(decryptedTransaction) // { foo: 'bar' }
}
