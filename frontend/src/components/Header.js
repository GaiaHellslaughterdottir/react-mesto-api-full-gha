import React from "react";
import {Link, useLocation, Route, Routes} from "react-router-dom";

export default function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo"/>
      <div className="header__wrapper">
        {props.loggedIn && props.userInfo.data !== undefined &&
        <p className="header__email">{props.userInfo.data.email}</p>}
        <Routes>
          <Route exact path="/" element={<Link to="/sign-out" className="login-link">Выйти</Link>}/>
          <Route path="/sign-up" element={<Link to="/sign-in" className="login-link">Войти</Link>}/>
          <Route path="/sign-in" element={<Link to="/sign-up" className="login-link">Регистрация</Link>}/>
        </Routes>
      </div>
    </header>
  );
}