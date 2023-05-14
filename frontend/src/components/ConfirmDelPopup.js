import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDelPopup(props) {

    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.onCardDelete(props.deleteCardId);
    }

    return (
        <PopupWithForm
            name="del-confirm"
            title="Вы уверены?"
            isOpen={props.isOpen}
            onClose={props.onClose}
            textButton={props.textButton}
            onSubmit={handleSubmit} />
    )
}

export default ConfirmDelPopup