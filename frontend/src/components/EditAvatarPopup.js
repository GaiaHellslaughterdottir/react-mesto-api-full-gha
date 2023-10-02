import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    if (currentUser.avatar !== undefined) {
      avatarRef.current.value = currentUser.avatar;
    }
  }, [currentUser]);

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm title="Обновить аватар"
                   name="edit-avatar"
                   buttonTitle="Сохранить"
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
      <input ref={avatarRef}
             type="url"
             name="avatar"
             className="form__field"
             id="form__field-edit-avatar"
             placeholder="Ссылка на картинку"
             required/>
      <span id="avatar-error" className="form__error"/>
    </PopupWithForm>
  );
}