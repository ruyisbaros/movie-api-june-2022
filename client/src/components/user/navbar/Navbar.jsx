import React from 'react'
import logoImg from "../../../assets/logos/nav-logo.jpg"
import "./navbar.css"
import { GiArchiveResearch } from "react-icons/gi"
import { Link } from 'react-router-dom'
import RouterLink from '../../Plug & Play comps/RouterLink'


const Navbar = () => {
    return (
        <div className="bg-secondary shadow-sm shadow-gray-500">
            <div className="text-white max-w-screen-xl mx-auto p-2">
                <div className="flex justify-between items-center">
                    <RouterLink path="">
                        <img className="logo-img" src={logoImg} alt="" />
                    </RouterLink>

                    <ul className="flex items-center space-x-4">
                        <button className="bg-dark-subtle p-1 rounded">
                            <li><GiArchiveResearch className="text-secondary " size={24} /></li>
                        </button>
                        <li>
                            <input type="text" className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl
                            focus:border-white transition" placeholder="Search..." />
                        </li>
                        <li className="font-semibold text-lg">
                            <RouterLink path="login">Login</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
