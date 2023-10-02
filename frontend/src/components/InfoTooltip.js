import React from "react";
import okImage from "../images/Union.png";
import failImage from "../images/Union_error.png";

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`${props.name}-popup`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" onClick={props.onClose}/>
        <div className="tooltip">
          <img className="tooltip__image" src={props.isSuccess ? okImage : failImage}/>
          <p className="tooltip__title">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!\nПопробуйте ещё раз.'}</p>
        </div>
      </div>
    </div>
  );
}