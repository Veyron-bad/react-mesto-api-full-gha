import React from "react";
import successIcon from '../../images/SuccessIcon.svg';
import failIcon from '../../images/FailIcon.svg';
import './InfoTooltip.css'

function InfoTooltip(props) {

    const popupImage = props.onMessage ? successIcon : failIcon;

    return (
        <div className={`popup info-tooltips ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__button-close" type="button" onClick={props.onClose}></button>
                <img className="info-tooltips__img" src={popupImage} alt={props.infoMessage} />
                <h2 className="info-tooltips__title">{props.infoMessage}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip

