import React from "react";

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_image-overlay ${props.isOpen ? 'popup_opened' : ''}`} id="place-image-popup">
      <div className="popup__container popup__container_no-background">
        <button className="popup__close-icon" type="button" onClick={props.onClose}/>
        <div className="place-info">
          <img className="place-info__image" src={props.card.link} alt={`Изображение ${props.card.name}`}/>
          <p className="place-info__title">{props.card.name}</p>
        </div>
      </div>
    </div>
  );
}