import React, { useState } from "react";
import "./Register.css"
import { Link } from "react-router-dom";


function Register({ onRegestration }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
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

        onRegestration(formValue);
    }

    return (

        <form className="sign-up" onSubmit={handleSubmit}>
            <h2 className="sign-up__title">Регистрация</h2>
            <input onChange={handleChange} type="email" name="email" value={formValue.email} placeholder="Email" className="sign-up__input" />
            <input onChange={handleChange} type="password" name="password" value={formValue.password} placeholder="Password" className="sign-up__input" />
            <button type="submit" className="sign-up__submit">Зарегистрироваться</button>
            <p className="sign-up__caption" >Уже зарегистрированы?
                <Link to="/sign-in" className="sign-up__caption-link"> Войти</Link>
            </p>
        </form>
    )
}

export default Register