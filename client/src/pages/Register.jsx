import React, { useState } from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import axios from "axios"
import RouterLink from '../components/Plug & Play comps/RouterLink'
import { modalFormClasses, modalFormParentClasses } from '../utils/theme'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const validateUserInfo = ({ fullName, email, password, username }) => {

    const isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


    if (!fullName.trim()) return { ok: false, error: "Full name is missing" }
    if (!/^[a-z A-Z]+$/.test(fullName)) return { ok: false, error: "Invalid name" }

    if (!email.trim()) return { ok: false, error: "Email is missing" }
    if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email" }

    if (!username.trim()) return { ok: false, error: "UserName is missing" }
    if (username.length < 4) return { ok: false, error: "UserName must be min 4 characters" }

    if (!password.trim()) return { ok: false, error: "Password is missing" }
    if (password.length < 6) return { ok: false, error: "Password must be min 6 characters" }

    else return { ok: true }
}

const Register = () => {

    const [newUser, setNewUser] = useState({
        fullName: "", username: "", password: "", email: ""
    })
    const { fullName, username, password, email } = newUser
    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { ok, error } = validateUserInfo(newUser)
        if (!ok) return toast.error(error)

        try {
            const { data } = await axios.post("/api/v1/auth/register", { ...newUser })
            //console.log(data.user);
            navigate("/verification", { state: data.user, replace: true })
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className={modalFormParentClasses}>
            <div className="max-w-screen-xl mx-auto">
                <form onSubmit={handleSubmit} className={modalFormClasses + " w-72"}>
                    <Title>Register</Title>
                    <FormInput onChange={handleChange} value={fullName} type="text" name="fullName" placeholder="Enter your full name" label="Full Name" />
                    <FormInput onChange={handleChange} value={username} type="text" name="username" placeholder="Enter your username" label="Username" />
                    <FormInput onChange={handleChange} value={email} type="email" name="email" placeholder="Enter your email" label="Email" />
                    <FormInput onChange={handleChange} value={password} type="password" name="password" placeholder="Enter your password" label="Password" />
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
