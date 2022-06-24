import React from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import RouterLink from '../components/Plug & Play comps/RouterLink'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'

const ForgetPassword = () => {
    return (
        <div className="fixed inset-0 bg-primary -z-10 flex items-center content-center">
            <div className="max-w-screen-xl mx-auto">
                <form className="bg-secondary rounded p-6 w-96 space-y-6">
                    <Title>Please Enter Your Email</Title>
                    <FormInput name="email" placeholder="Enter your email" label="Email" />

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
