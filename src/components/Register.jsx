import React, { useState } from 'react'
import axios from 'axios';




const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")




    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await axios.post(`${process.env.REACT_API}/user/signup`, {
                username: name,
                email,
                password
            })
            setName('');
            setEmail('');
            setPassword('');

            console.log(response);



        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div>
            <div className='container'>
                <div className='cover'>
                    <form onSubmit={handleSubmit}>

                        <div className='user'>
                            <label className='form-label'>Username</label>
                            <input type="text" placeholder='Enter your name' value={name} onChange={handleName} />
                        </div>

                        <div className='user'>
                            <label className='form-label'>Email</label>
                            <input type="email" placeholder='Enter your email' value={email} onChange={handleEmail} />
                        </div>

                        <div className='user'>
                            <label className='form-label'>Password</label>
                            <input type="password" placeholder='Enter your password' value={password} onChange={handlePassword} />
                        </div>
                        <button type='submit'>Sign UP</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register