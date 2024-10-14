import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    const handleChange = async (e) => {
        e.preventDefault();
        setEmail("")
        setPassword('')

        try {
            const response = await axios.post(`${process.env.REACT_API}api/user/signin`, {
                email,
                password
            })

            console.log(response);
            const token = response.data.token;
            const name = response.data.name
            localStorage.setItem('token', token)
            localStorage.setItem('name', name)
        } catch (error) {
            console.log(error);

        }


    }





    return (
        <div className='container'>
            <div className="cover">
                <form onSubmit={handleChange}>
                    <div>
                        <h2>Signin</h2>
                    </div>
                    <div className='user'>
                        <label className='form-label'>Email</label>
                        <input type="email" placeholder='Enter your email' value={email} onChange={handleEmail} />
                    </div>
                    <div>
                        <label className='form-label'>Password</label>
                        <input type="password" placeholder='Enter your password' value={password} onChange={handlePassword} />
                    </div>
                    <div className='button'>
                        <button type='submit'>SignIn</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login