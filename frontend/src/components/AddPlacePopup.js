import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // обработка ошибок есть в самом обработчике onAddPlace (App.js 121)
    props.onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm title="Новое место"
                   name="place"
                   buttonTitle="Сохранить"
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
      <input value={name}
             onChange={e => setName(e.target.value)}
             minLength="2"
             maxLength="30"
             type="text"
             name="place-name"
             className="form__field"
             id="form__field-place-name"
             placeholder="Название"
             required/>
      <span id="place-name-error" className="form__error"/>
      <input value={link}
             onChange={e => setLink(e.target.value)}
             type="url"
             name="image"
             className="form__field"
             id="form__field-place-image"
             placeholder="Ссылка на картинку"
             required/>
      <span id="image-error" className="form__error"/>
    </PopupWithForm>
  );
}