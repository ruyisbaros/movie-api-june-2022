import React from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import RouterLink from '../components/Plug & Play comps/RouterLink'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import { useGlobalTheme } from '../Context/ThemeProvider'

const ConfirmPassword = () => {

    const { theme } = useGlobalTheme()
    //console.log("confirm password page::::", theme);
    return (
        <div className="fixed inset-0 bg-primary -z-10 flex items-center content-center">
            <div className="max-w-screen-xl mx-auto">
                <form className="bg-secondary rounded p-6 w-96 space-y-6">
                    <Title>Please Enter New Password</Title>
                    <FormInput type="password" name="newPassword" placeholder="Enter your new password" label="New Password" />
                    <FormInput type="password" name="confirmPassword" placeholder="Confirm your new password" label="Confirm New Password" />

                    <Submit value="Set New Password" />


                </form>
            </div>
        </div>
    )
}

export default ConfirmPassword