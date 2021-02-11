import React, { ChangeEvent, useRef } from 'react'

export const ImportFromCsv = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (fileInputRef.current?.files) {
            fileInputRef.current.files[0].text().then(textContent => {
                console.log({ textContent })
            })
        }
    }

    return (
        <>
            <input accept="text/csv" ref={fileInputRef} type="file" />
            <button type="submit" onClick={handleClick}>{'Importer'}</button>
        </>
    )
}