export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const profile = document.querySelector('.profile');
export const profileNameSelector = '.profile__name';
export const profileProfessionSelector = '.profile__profession';
export const popupEditProfileSelector = '.popup_type_editProfile';
export const popupEditAvatar = '.popup_type_change-avatar';
export const buttonEditProfile = profile.querySelector('.profile__button-edit');
export const popupEditProfile = document.querySelector('.popup_type_editProfile');
export const popupFormEditProfile = document.forms['profileFormEditing'];
export const popupFormAddCard = document.forms['addCards'];
export const popupFormEditAvatar = document.forms['changeAvatar'];
export const popupConfirmDelete = '.popup_type_del-confirm';
export const buttonChangeAvatar = profile.querySelector('.profile__avatar-overlay');
export const userAvatarSelector = '.profile__avatar';

