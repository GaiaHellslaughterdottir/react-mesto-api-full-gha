import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );


  return (
    <article className="element">
      {isOwn && <button className="element__basket" type="button" onClick={handleDeleteClick}/>}
      <img className="element__image"
           src={props.card.link}
           alt={`Изображение ${props.card.name}`}
           onClick={handleClick}/>
      <div className="element__place-and-like">
        <h2 className="element__place">{props.card.name}</h2>
        <div className="element__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
          <span className="element__likes-number">{props.card.likes !== undefined ? props.card.likes.length : 0}</span>
        </div>
      </div>
    </article>
  );

  function handleClick() {
    props.onCardClick(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
}