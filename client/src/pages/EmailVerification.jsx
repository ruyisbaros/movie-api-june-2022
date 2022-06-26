import React, { useState, useEffect, useRef } from 'react'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import { modalFormClasses, modalFormParentClasses } from '../utils/theme'
import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-toastify"

const code_length = 5

const validateOTP = (code) => {

    for (let value of code) {
        if (isNaN(parseInt(value))) {
            return { ok: false, error: "OTP must be at least 5 characters" }
        }
    }

    return { ok: true }
}

const EmailVerification = () => {

    const [code, setCode] = useState(new Array(code_length).fill(""))
    const [activeCodeIndex, setActiveCodeIndex] = useState(0)

    const inputRef = useRef()
    const navigate = useNavigate()

    const { state } = useLocation()
    //console.log("state:", state);
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
        //console.log(value);
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

    const handleVerification = async (e) => {
        e.preventDefault()
        const { ok, error } = validateOTP(code)
        if (!ok) return toast.error(error)

        try {
            const { data } = await axios.get(`/api/v1/auth/email_confirm/${code.join("")}`)
            toast.success("Your email has been verified successfully :)")
            if (data.user.isVerified) {
                navigate("/")
            }
            //console.log('verified user', data);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [activeCodeIndex])
    //console.log(inputRef);

    useEffect(() => {
        if (!state) navigate("/not-found")
    }, [state, navigate])

    return (
        <div className={modalFormParentClasses}>
            <div className="max-w-screen-xl mx-auto">
                <form className={modalFormClasses} onSubmit={handleVerification}>
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
                    <Submit value="verify Account" />


                </form>
            </div>
        </div>
    )
}

export default EmailVerification
