import React from "react";

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');



  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({
      email,
      password
    });
  }

  return (
    <div className="sign">
      <form className="form" name="login-form" onSubmit={handleSubmit}>
        <div className="form__field-wrapper">
          <h3 className="form__title form__title_dark-theme">Вход</h3>
          <input value={email}
                 onChange={e => setEmail(e.target.value)}
                 minLength="2"
                 maxLength="40"
                 type="text"
                 name="email"
                 className="form__field form__field_dark-theme"
                 id="form__field-email"
                 placeholder="Email"
                 required/>
          <span id="email-error" className="form__error form__error_dark-theme"/>
          <input value={password}
                 onChange={e => setPassword(e.target.value)}
                 minLength="2"
                 maxLength="200"
                 type="password"
                 name="password"
                 className="form__field  form__field_dark-theme"
                 id="form__field-password"
                 placeholder="Пароль"
                 required/>
          <span id="password-error" className="form__error form__error_dark-theme"/>
        </div>
        <div className="form__submit-wrapper">
          <button className="form__button-submit form__submit-button_dark-theme" type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
}