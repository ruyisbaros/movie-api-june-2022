import React from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import { Link } from "react-router-dom"
import RouterLink from '../components/Plug & Play comps/RouterLink'
import { modalFormClasses, modalFormParentClasses } from '../utils/theme'

const Login = () => {
    return (
        <div className={modalFormParentClasses}>
            <div className="max-w-screen-xl mx-auto">
                <form className={`${modalFormClasses} w-72`}>
                    <Title>Login</Title>
                    <FormInput type="email" name="email" placeholder="Enter your email" label="Email" />
                    <FormInput type="password" name="password" placeholder="Enter your password" label="Password" />
                    <Submit value="Login" />

                    <div className="flex justify-between items-center">
                        <RouterLink path="forget-password">Forgot Password??</RouterLink>
                        <RouterLink path="register">Register</RouterLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
