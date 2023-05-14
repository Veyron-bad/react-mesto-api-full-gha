import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUserData = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUserData._id;
    const isLike = props.card.likes.some(item => item._id === currentUserData._id)

    const handleClick = () => {
        props.onCardClick(props.card);
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card)
    }

    const handleCardDelete = () => {
        props.onClickDelBtn(props.card)
    }

    return (
        <article className="element">
            {isOwn && <button type="button" className="element__delete" onClick={handleCardDelete} />}
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
            <div className="element__footer">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__footer-buttons">
                    <button type="button" className={`element__like ${isLike ? 'element__like_active' : ''}`} onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card