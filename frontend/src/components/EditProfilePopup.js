import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]);

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm
            name="editProfile"
            title="Редактировать профиль"
            textButton={props.textButton}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input id="name-input" type="text" className="popup__input popup__input_type_name" name="name"
                placeholder="Имя" minLength="2" maxLength="40" value={name} onChange={handleChangeName} required />
            <span className="popup__input-error name-input-error">Вы пропустили это поле.</span>
            <input id="proff-input" type="text" className="popup__input popup__input_type_profession" name="about"
                placeholder="Проффесия" minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} required />
            <span className="popup__input-error proff-input-error">Вы пропустили это поле.</span>
        </PopupWithForm>
    )
}
export default EditProfilePopup;