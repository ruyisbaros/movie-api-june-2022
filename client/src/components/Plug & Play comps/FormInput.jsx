import React from 'react'

const FormInput = ({ name, placeholder, label, ...rest }) => {
    return (
        <div className="flex flex-col-reverse">
            <input name={name} id={name}
                placeholder={placeholder}
                className=" text-white bg-transparent rounded border-2 
                            dark:border-dark-subtle  dark:focus:border-dark-subtle focus:border-secondary w-full text-lg p-1
                            peer transition"
                {...rest}
            />
            <label className="dark:text-dark-subtle text-secondary text-sm font-semibold 
            dark:peer-focus:text-white peer-focus:text-secondary mb-1" htmlFor={name}>{label} :</label>
        </div>
    )
}

export default FormInput
