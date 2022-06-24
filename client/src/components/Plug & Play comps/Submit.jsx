import React from 'react'

const Submit = ({ value }) => {
    return (
        <input type="submit" value={value}
            className="w-full rounded bg-white text-secondary cursor-pointer 
        transition hover:bg-opacity-70 font-semibold  text-lg p-1" />
    )
}

export default Submit