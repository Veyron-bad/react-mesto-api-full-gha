import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDelPopup from './ConfirmDelPopup';
import React, { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Register from './sing-up/Register';
import Login from './sing-in/Login';
import ProtectedRouteElement from './ProtectedRoute';
import apiAuth from '../utils/apiAuth';
import InfoTooltip from './InfoTooltip/InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDelPopup, setIsConfirmDelPopup] = useState(false);
  const [isPopupMessage, setIsPopupMessage] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [textButtonSave, setTextButtonSave] = useState('Сохранить');
  const [textButtonCreate, setTextButtonCreate] = useState('Создать');
  const [textButtonDelete, setTextButtonDelete] = useState('Да');
  const [deleteCardId, setDeleteCardId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [infoMessage, setInfoMessage] = useState('');

  const navigate = useNavigate();

  //ПРОВЕРКА ТОКЕНА
  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
      apiAuth.checkToken()
        .then((res) => {
          setLoggedIn(true);
          navigate('/', { replace: true })
        })

        .catch((err) => {
          console.log(`Ошибка токена: ${err}`)
        })
    }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })

        .catch((err) => {
          console.log(`Ошибка получения данных: ${err}`)
        })
    }
  }, [loggedIn]);

  //РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  const handleRegistration = (dataForm) => {
    apiAuth.userRegistrate(dataForm)
      .then((res) => {
        // setLoggedIn(true);
        setIsPopupMessage(true);
        setIsRegistrationSuccess(true);
        setInfoMessage('Вы успешно зарегистрировались!');
        setUserData({ email: res.data.email })
        navigate('/', { replace: true })
      })

      .catch((err) => {
        setIsPopupMessage(true);
        setIsRegistrationSuccess(false);
        setInfoMessage('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(`Ошибка регистрации пользователя: ${err}`)
      })
  }

  //АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
  const handleLogin = (dataForm) => {
    apiAuth.userAuthorization(dataForm)
      .then((res) => {
        setLoggedIn(true);
        setUserData({ email: dataForm.email })
        navigate('/', { replace: true })
      })

      .catch((err) => {
        setIsPopupMessage(true);
        setIsRegistrationSuccess(false)
        setInfoMessage('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(`Ошибка авторизации: ${err}`)
      })
  }

  //ВЫХОД ИЗ УЧЕТКИ ПОЛЬЗОВАТЕЛЯ
  const handleLogOut = () => {
    apiAuth.useLogout()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in', { replace: true })
      })
  }


  //ОБРАБОТЧИК ОТКРЫТИЯ ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  //ОБРАБОТЧИК ОТКРЫТИЯ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРКИ
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  //ОБРАБОТЧИК ОТКРЫТИЯ ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  //ОБРАБОТЧИК НАЖАТИЯ НА КАРТИНКУ КАРТОЧКИ
  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  //ОБРАБОТЧИК ОТКРЫТИЯ ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ
  const handelConfirmDelCard = (card) => {
    setIsConfirmDelPopup(true);
    setDeleteCardId(card);
  }

  //ОБНОВЛЕНИЕ АВАТАРКИ
  const handleUpdateAvatar = (newUserData) => {
    setTextButtonSave('Сохранение...')
    api.editProfileAvatar(newUserData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Ошибка получения данных аватар: ${err}`)
      })

      .finally(() => {
        setTextButtonSave('Сохранить')
      })
  }

  //ОБНОВЛЕНИЕ ИНФОРМАЦИ О ПОЛЬЗОВАТЕЛИ
  const handleUpdateUser = (newUserData) => {
    setTextButtonSave('Сохранение...')
    api.editProfileInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Ошибка получения данных о пользователе: ${err}`)
      })

      .finally(() => {
        setTextButtonSave('Сохранить')
      })
  }

  //ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
  const handleAddPlaceSubmit = (data) => {
    setTextButtonCreate('Загрузка...')
    api.addCard(data)
      .then((res) => {
        setCards([res, ...cards])
      })

      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`)
      })

      .finally(() => {
        setTextButtonCreate('Создать')
      })
  }

  //ЗАКРЫТИЕ ПОПАП ПО НАЖАТИЮ ESC
  const handleEscPress = (evt) => {
    const ecs = 'Escape';
    if (evt.key === ecs) {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsImagePopupOpen(false);
      setIsConfirmDelPopup(false);
      setIsPopupMessage(false);
    }
  }

  //УСТАНОВКА ЛАЙКОВ
  const handleCardLike = (card) => {
    const isLike = card.likes.some(item => item._id === currentUser._id);

    (!isLike ? api.addLike(card._id) : api.deleteLike(card._id))
      .then((newDataCard) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? newDataCard : c)))
      })

      .catch((err) => {
        console.log(`Ошибка нажатия лайка: ${err}`)
      });
  }

  //УДАЛЕНИЕ КАРТОЧКИ
  const handleCardDelete = (card) => {
    setTextButtonDelete('Удаление...')
    api.deleteCard(card._id)
      .then(() => {
        const newDataCards = cards.filter((item) => item !== card);
        setCards(newDataCards)
        closeAllPopups();
      })

      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`)
      })

      .finally(() => {
        setTextButtonDelete('Да')
      })
  }

  //ОБРАБОТЧИК ЗАКРЫТИЯ ПОПАП ПО ОВЕРЛАЙ
  const closePopupByOverlay = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsImagePopupOpen(false);
      setIsConfirmDelPopup(false);
      setIsPopupMessage(false);
    }
  }

  //ОБРАБОТЧИК ЗАКРЫТИЯ ПОПАПОВ
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDelPopup(false);
    setIsPopupMessage(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main className="page" onKeyUp={handleEscPress} onMouseUp={closePopupByOverlay}>
        <Header loggedIn={loggedIn} userData={userData} onLogOut={handleLogOut} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegestration={handleRegistration} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRouteElement
              loggedIn={loggedIn}
              element={Main}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onClickDelBtn={handelConfirmDelCard}
            />} />
        </Routes>
        <Footer />

        {/* POPUP РЕДАКТИРОВАНИЯ ПРОФИЛЯ */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textButton={textButtonSave} />

        {/* POPUP РЕДАКТИРОВАНИЯ АВАТАРКИ */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textButton={textButtonSave} />

        {/* POPUP ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ */}
        <ConfirmDelPopup
          isOpen={isConfirmDelPopup}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          deleteCardId={deleteCardId}
          textButton={textButtonDelete} />

        {/* POPUP ОТКРЫТИЯ КАРТИНКИ */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen} />

        {/* POPUP ДОБАВЛЕНИЯ КАРТОЧКИ */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          textButton={textButtonCreate} />

        {/*POPUP ОПОВЕЩЕНИЯ О РЕГИСТРАЦИИ*/}
        <InfoTooltip isOpen={isPopupMessage} onClose={closeAllPopups} onMessage={isRegistrationSuccess} infoMessage={infoMessage} />

      </main>
    </CurrentUserContext.Provider>
  );
}

export default App;
