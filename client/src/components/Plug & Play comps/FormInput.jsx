import React from 'react'

const FormInput = ({ name, placeholder, label, ...rest }) => {
    return (
        <div className="flex flex-col-reverse">
            <input name={name} id={name}
                placeholder={placeholder}
                className=" text-white bg-transparent rounded border-2 
                            border-primary  focus:border-dark-subtle w-full text-lg p-1
                            peer transition"
                {...rest}
            />
            <label className="text-dark-subtle text-sm font-semibold peer-focus:text-white mb-1" htmlFor={name}>{label} :</label>
        </div>
    )
}

export default FormInput
