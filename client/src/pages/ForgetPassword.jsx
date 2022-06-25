import React from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import RouterLink from '../components/Plug & Play comps/RouterLink'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import { modalFormClasses, modalFormParentClasses } from '../utils/theme'

const ForgetPassword = () => {
    return (
        <div className={modalFormParentClasses}>
            <div className="max-w-screen-xl mx-auto">
                <form className={modalFormClasses + " w-96"}>
                    <Title>Please Enter Your Email</Title>
                    <FormInput type="email" name="email" placeholder="Enter your email" label="Email" />

                    <Submit value="Send Reset Mail" />

                    <div className="flex justify-between items-center">
                        <RouterLink path="login">Login</RouterLink>
                        <RouterLink path="register">Register</RouterLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
