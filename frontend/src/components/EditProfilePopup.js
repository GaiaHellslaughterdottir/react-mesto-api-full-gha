import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
    }
    if (currentUser.about !== undefined) {
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  return (
    <PopupWithForm title="Редактировать профиль"
                   name="profile"
                   buttonTitle="Сохранить"
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
      <input value={name}
             onChange={e => setName(e.target.value)}
             minLength="2"
             maxLength="40"
             type="text"
             name="name"
             className="form__field"
             id="form__field-name"
             placeholder="Имя"
             required/>
      <span id="name-error" className="form__error"/>
      <input value={description}
             onChange={e => setDescription(e.target.value)}
             minLength="2"
             maxLength="200"
             type="text"
             name="vocation"
             className="form__field"
             id="form__field-vocation"
             placeholder="О себе"
             required/>
      <span id="vocation-error" className="form__error"/>
    </PopupWithForm>
  );
}