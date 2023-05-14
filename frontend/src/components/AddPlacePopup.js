import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');

    const handleChangeTitle = (evt) => {
        setTitle(evt.target.value);
    }

    const handleChangeUrl = (evt) => {
        setUrl(evt.target.value)
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.onAddPlace({
            name: title,
            link: url
        })

        props.onClose();

        setTitle('')
        setUrl('')
    }

    return (
        <PopupWithForm
            name="addCards"
            title="Новое место"
            textButton={props.textButton}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input
                id="title-input"
                type="text"
                className="popup__input popup__input_type_title"
                name="inputTitle"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                onChange={handleChangeTitle}
                value={title}
                required />
            <span
                className="popup__input-error title-input-error">
                Вы пропустили это поле.
            </span>
            <input
                id="url-input"
                type="url"
                className="popup__input popup__input_type_url"
                name="inputUrl"
                placeholder="Ссылка на картинку"
                onChange={handleChangeUrl}
                value={url}
                required />
            <span
                className="popup__input-error url-input-error">
                Введите адрес сайта.
            </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
