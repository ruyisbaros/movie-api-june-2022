import React from 'react'

const Submit = ({ value }) => {
    return (
        <input type="submit" value={value}
            className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white  cursor-pointer 
        transition hover:bg-opacity-70 font-semibold  text-lg p-1" />
    )
}

export default Submit