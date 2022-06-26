import React from 'react'
import { useGlobalAuth } from '../Context/AuthProvider';

const Home = () => {
    const { authInfo } = useGlobalAuth()
    console.log(authInfo);

    return (
        <div>
            Home
        </div>
    )
}

export default Home
