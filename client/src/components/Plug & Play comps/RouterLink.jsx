import React from 'react'
import { Link } from 'react-router-dom'

const RouterLink = ({ path, children }) => {
    return (
        <Link to={`/${path}`} className="text-dark-subtle transition hover:text-white" >
            {children}
        </Link>
    )
}

export default RouterLink
