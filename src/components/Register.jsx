import React, { useEffect } from 'react'
import dotenv from "dotenv";
import axios from 'axios';




const Register = () => {

    try {
        const userRegister = async () => {
            const response = await axios.post(`http://localhost:8080/api/user/signup`)
            console.log(response);
        }
        useEffect(() => {
            // userRegister();
        }, [])
    } catch (error) {

    }


    return (
        <div>
            <div className='container'>
                <div className='cover'>
                    <form action="">

                        <div className='user'>
                            <label className='form-label'>Username</label>
                            <input type="text" placeholder='Enter your name' />
                        </div>

                        <div className='user'>
                            <label className='form-label'>Email</label>
                            <input type="text" placeholder='Enter your name' />
                        </div>

                        <div className='user'>
                            <label className='form-label'>Password</label>
                            <input type="text" placeholder='Enter your name' />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register