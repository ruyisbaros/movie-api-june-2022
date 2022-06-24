import React from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import { Link } from "react-router-dom"
import RouterLink from '../components/Plug & Play comps/RouterLink'

const Register = () => {
    return (
        <div className="fixed inset-0 bg-primary -z-10 flex items-center content-center">
            <div className="max-w-screen-xl mx-auto">
                <form className="bg-secondary rounded p-6 w-72 space-y-6">
                    <Title>Register</Title>
                    <FormInput name="fullName" placeholder="Enter your full name" label="Full Name" />
                    <FormInput name="email" placeholder="Enter your email" label="Email" />
                    <FormInput name="password" placeholder="Enter your password" label="Password" />
                    <Submit value="Register" />

                    <div className="flex justify-between items-center">

                        <RouterLink path="login">Login</RouterLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
