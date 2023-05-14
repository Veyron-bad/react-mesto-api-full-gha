import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

    const currentUserData = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
                    <img src={currentUserData.avatar} alt="Аватарка" className="profile__avatar" />
                </div>
                <div className="profile__editing">
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUserData.name}</h1>
                        <button className="profile__button-edit" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__profession">{currentUserData.about}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        onClickDelBtn={props.onClickDelBtn} />
                ))}
            </section>
        </main>
    )
}

export default Main