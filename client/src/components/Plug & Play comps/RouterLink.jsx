import React from 'react'
import { Link } from 'react-router-dom'

const RouterLink = ({ path, children }) => {
    return (
        <Link to={`/${path}`} className="dark:text-dark-subtle transition dark:hover:text-white
        text-light-subtle hover:text-black" >
            {children}
        </Link>
    )
}

export default RouterLink
