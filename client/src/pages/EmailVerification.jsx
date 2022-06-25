import React, { useState, useEffect, useRef } from 'react'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'

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
        <div className="fixed inset-0 bg-primary -z-10 flex items-center content-center">
            <div className="max-w-screen-xl mx-auto">
                <form className="bg-secondary rounded p-6 space-y-6">
                    <div>
                        <Title>To verify your email, please enter the code </Title>
                        <p className="text-center text-dark-subtle text-sm">The code has been sent to your email</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                        {code.map((_, index) => (
                            <input key={index}
                                ref={activeCodeIndex === index ? inputRef : null}
                                type="number"
                                className="w-12 h-12 border-2 rounded border-dark-subtle 
                        bg-transparent  transition focus:border-white text-center text-white
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
