import React, { useState, useEffect, useRef } from 'react'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import { modalFormClasses, modalFormParentClasses } from '../utils/theme'

const code_length = 5

const EmailVerification = () => {

    const [code, setCode] = useState(new Array(code_length).fill(""))
    const [activeCodeIndex, setActiveCodeIndex] = useState(0)

    const inputRef = useRef()

    let currentCodeIndex;

    const focusNextInputField = (index) => {
        setActiveCodeIndex(index + 1)
    }

    const focusPreviousInputField = (index) => {
        let prevIndex;
        const diff = index - 1
        prevIndex = diff !== 0 ? diff : 0
        setActiveCodeIndex(prevIndex)
    }

    const handleCodeChanges = ({ target }) => {
        const { value } = target
        const newCode = [...code]
        newCode[currentCodeIndex] = value.substring(value.length - 1, value.length)
        //value.length === 2 && focusNextInputField(currentCodeIndex)
        console.log(value);
        if (!value) focusPreviousInputField(currentCodeIndex)
        else focusNextInputField(currentCodeIndex)

        setCode([...newCode])
    }

    const handleKeyDown = ({ key }, index) => {
        currentCodeIndex = index
        if (key === "Backspace") {
            focusPreviousInputField(currentCodeIndex);
        }
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [activeCodeIndex])
    //console.log(inputRef);
    return (
        <div className={modalFormParentClasses}>
            <div className="max-w-screen-xl mx-auto">
                <form className={modalFormClasses}>
                    <div>
                        <Title>To verify your email, please enter the code </Title>
                        <p className="text-center dark:text-dark-subtle text-secondary text-sm">The code has been sent to your email</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                        {code.map((_, index) => (
                            <input key={index}
                                ref={activeCodeIndex === index ? inputRef : null}
                                type="number"
                                className="w-12 h-12 border-2 rounded dark:border-dark-subtle border-light-subtle
                        dark:bg-transparent bg-dark-subtle  transition dark:focus:border-white focus:border-primary text-center dark:text-white text-secondary
                        font-semibold text-xl spin-button-none"

                                value={code[index] || ""}
                                onChange={handleCodeChanges}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <Submit value="Send The Code" />


                </form>
            </div>
        </div>
    )
}

export default EmailVerification
