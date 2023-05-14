function ImagePopup(props) {
    return (
        <div className={`popup popup_type_zoom ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <button className="popup__button-close" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={props.card.link} alt={props.card.name} />
                    <figcaption className="popup__caption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup