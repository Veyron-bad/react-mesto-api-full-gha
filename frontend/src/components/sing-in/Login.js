import React, { useState } from "react";
import "./Login.css";
import apiAuth from "../../utils/apiAuth.js";

function Login({onLogin}) {

    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onLogin(formValue);
    }
    
    return (
        <>
            <form className="sign-in" onSubmit={handleSubmit} >
                <h2 className="sign-in__title">Вход</h2>
                <input onChange={handleChange} type="email" name="email" placeholder="Email" className="sign-in__input" />
                <input onChange={handleChange} type="password" name="password" placeholder="Password" className="sign-in__input" />
                <button type="submit" className="sign-in__submit">Войти</button>
            </form>
        </>
    )
}

export default Login