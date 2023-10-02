import React from "react";

export default function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`${props.name}-popup`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={props.onClose}/>
        <form className="form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
          <h3 className="form__title">{props.title}</h3>
          {props.children}
          <button className="form__button-submit" type="submit">{props.buttonTitle}</button>
        </form>
      </div>
    </div>
  );
}