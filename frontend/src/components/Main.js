import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  let avatarImg = undefined;
  if (currentUser !== undefined && currentUser.avatar !== undefined) {
    avatarImg = currentUser.avatar;
  }

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__avatar-and-info">
          <div className="profile__avatar-wrapper">
            <div className="avatar" style={avatarImg && {backgroundImage: `url(${avatarImg})`}}/>
            <button className="profile__avatar-button" onClick={props.onEditAvatar}/>
          </div>

          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
            <p className="profile__info-vocation">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-place-button" type="button" onClick={props.onAddPlace}/>
      </section>

      <section className="elements">
        {props.cards.map((card, i) => (
          <Card key={card._id} card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}/>
        ))}
      </section>
    </main>
  );

}