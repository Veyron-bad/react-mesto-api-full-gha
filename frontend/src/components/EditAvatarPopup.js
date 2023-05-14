import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const [url, setUrl] = React.useState('');

    const avatarRef = React.useRef('');

    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        })

        setUrl('');
    }

    const handleChangeUrlAvatar = (evt) => {
        setUrl(evt.target.value);
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            textButton={props.textButton}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input ref={avatarRef} id="avatar-url-input" type="url" className="popup__input popup__input_type_url" name="avatar"
                placeholder="Ссылка на картинку" value={url} onChange={handleChangeUrlAvatar} required />
            <span className="popup__input-error avatar-url-input-error">Введите адрес сайта.</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;