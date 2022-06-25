import React from 'react'
import FormInput from '../components/Plug & Play comps/FormInput'
import RouterLink from '../components/Plug & Play comps/RouterLink'
import Submit from '../components/Plug & Play comps/Submit'
import Title from '../components/Plug & Play comps/Title'
import { useGlobalTheme } from '../Context/ThemeProvider'
import { modalFormClasses, modalFormParentClasses } from '../utils/theme'

const ConfirmPassword = () => {

    const { theme } = useGlobalTheme()
    //console.log("confirm password page::::", theme);
    return (
        <div className={modalFormParentClasses}>
            <div className="max-w-screen-xl mx-auto">
                <form className={modalFormClasses + " w-96"}>
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