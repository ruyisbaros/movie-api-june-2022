import React from 'react'
import logoImg from "../../../assets/logos/nav-logo.jpg"
import "./navbar.css"
import { BsFillSunFill } from "react-icons/bs";
import RouterLink from '../../Plug & Play comps/RouterLink'
import { useGlobalTheme } from '../../../Context/ThemeProvider';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const { toggleTheme } = useGlobalTheme()

    return (
        <div className="bg-secondary shadow-sm shadow-gray-500">
            <div className="text-white max-w-screen-xl mx-auto p-2">
                <div className="flex justify-between items-center">
                    <RouterLink path="">
                        <img className="logo-img" src={logoImg} alt="" />
                    </RouterLink>

                    <ul className="flex items-center space-x-4">
                        <button onClick={toggleTheme} className="dark:bg-white bg-dark-subtle p-1 rounded">
                            <li><BsFillSunFill className="text-secondary transition dark:hover:text-light-subtle hover:text-white " size={24} /></li>
                        </button>
                        <li>
                            <input type="text" className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl
                            focus:border-white transition" placeholder="Search..." />
                        </li>
                        <li className="font-semibold text-lg">
                            <Link to="login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
