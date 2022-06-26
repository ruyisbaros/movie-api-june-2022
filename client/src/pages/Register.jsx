import React, { useState } from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import axios from "axios"
import RouterLink from '../components/Plug & Play comps/RouterLink'
import { modalFormClasses, modalFormParentClasses } from '../utils/theme'
import { toast } from "react-toastify"

const Register = () => {

    const [newUser, setNewUser] = useState({
        fullName: "", username: "", password: "", email: ""
    })
    const { fullName, username, password, email } = newUser

    const handleChange = (e) => {
        e.preventDefault()
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.post("/api/v1/auth/register", { ...newUser })
        toast.success(data.message)
    }


    return (
        <div className={modalFormParentClasses}>
            <div className="max-w-screen-xl mx-auto">
                <form onSubmit={handleSubmit} className={modalFormClasses + " w-72"}>
                    <Title>Register</Title>
                    <FormInput onChange={handleChange} required value={fullName} type="text" name="fullName" placeholder="Enter your full name" label="Full Name" />
                    <FormInput onChange={handleChange} required value={username} type="text" name="username" placeholder="Enter your username" label="Username" />
                    <FormInput onChange={handleChange} required value={email} type="email" name="email" placeholder="Enter your email" label="Email" />
                    <FormInput onChange={handleChange} required value={password} type="password" name="password" placeholder="Enter your password" label="Password" />
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
