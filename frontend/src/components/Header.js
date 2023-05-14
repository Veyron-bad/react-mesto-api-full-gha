import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header({ loggedIn, userData, onLogOut }) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <Routes>
                <Route path="/"
                    element={loggedIn &&
                        <div className="header__info">
                            <p className="header__email">{userData.email}</p>
                            <button onClick={onLogOut} className="header__button-sign-out">Выйти</button>
                        </div>}
                />
                <Route path="/sign-in" element={<Link to="/sign-up" className="header__autorization">Регистрация</Link>} />
                <Route path="/sign-up" element={<Link to="/sign-in" className="header__autorization">Войти</Link>} />
            </Routes>
        </header>
    )
}

export default Header