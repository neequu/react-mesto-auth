import React from 'react';

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'

import ImagePopup from './ImagePopup.js'
import ProfilePopup from './ProfilePopup.js'
import AvatarPopup from './AvatarPopup.js'
import PlacePopup from './PlacePopup.js'
import ConfirmPopup from './ConfirmPopup.js';

import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // hooks
  const [isProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
  const [isPlacePopupOpen, setPlacePopupOpen] = React.useState(false)
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  const [currentUser , setCurrentUser ] = React.useState({})
  const [cards, setCards] = React.useState([]) 
  const [deletingCard, setDeletingCard] = React.useState({})

  const [isLoadingUserData, setIsLoadingUserData] = React.useState(false);
  const [isLoadingPlace, setIsLoadingPlace] = React.useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = React.useState(false);
  const [isDeletingCard, setIsDeletingCard] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [initialCards, userData] = await Promise.all([api.getInitialCards(), api.getUserInfo()])
        setCurrentUser(userData)
        setCards(initialCards)
      } catch (e) {
        console.log(e)
      } 
    }
  
    fetchData()

  }, [])

  // profile
  const handleEditProfileClick = () => {setProfilePopupOpen(!isProfilePopupOpen)}
  // place
  const handleAddPlaceClick = () => {setPlacePopupOpen(!isPlacePopupOpen)}
  // avatar
  const handleEditAvatarClick = () => {setAvatarPopupOpen(!isAvatarPopupOpen)}

  // close popups
  const closeAllPopups = () => {
    setProfilePopupOpen(false)
    setPlacePopupOpen(false)
    setAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setConfirmPopupOpen(false)
    setSelectedCard({});
  }

    // selected card
  const handleCardClick = async (card) => {
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    try {
      const res = await api.changeLikeCardStatus(card._id, isLiked)
      setCards(state => state.map(c => c._id === card._id ? res : c))

    } catch (e) {
      console.log(e)
    }
  } 

  const handleCardDelete = async () => {
    setIsDeletingCard(true)
    try {
      await api.deleteCard(deletingCard._id)
      setCards(state => state.filter(c => c._id !== deletingCard._id))
      closeAllPopups()
    } catch (e) {
      console.log(e)
    } finally {
      setIsDeletingCard(false)
    }
  }

  const handleCardDeleteReq = card => {
    setConfirmPopupOpen(true)
    setDeletingCard(card)
  }

  const handleUpdateUser = async (user) => {
    setIsLoadingUserData(true)
    try {
      const res = await api.editUserInfo(user)
      setCurrentUser(res)
      closeAllPopups()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingUserData(false)
    }
  }

  const handleUpdateAvatar = async (a) => {
    setIsLoadingAvatar(true)
    try {
      const res = await api.editAvatar(a)
      setCurrentUser(res)
      closeAllPopups()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingAvatar(false)
    }
  }

  const handleAddPlace = async place => {
    setIsLoadingPlace(true)
    try {
      const res = await api.addCard(place)
      setCards([res, ...cards])
      closeAllPopups()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingPlace(false)
    }
  }
  return (
  <>
    <CurrentUserContext.Provider value={currentUser}>
    <Header/>
    <Main 
      onEditProfile={handleEditProfileClick} 
      onEditAvatar={handleEditAvatarClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDeleteReq={handleCardDeleteReq}
    />
    <Footer/>

    <ProfilePopup 
      isOpen={isProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      isLoadingUserData={isLoadingUserData}
    />

    <AvatarPopup 
      isOpen={isAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
      isLoadingAvatar={isLoadingAvatar}
    />

    <PlacePopup 
      isOpen={isPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlace}
      isLoadingPlace={isLoadingPlace}
    />

    <ImagePopup
      isOpen={isImagePopupOpen}
      onClose={closeAllPopups}
      card={selectedCard}
    />
    <ConfirmPopup
      isOpen={isConfirmPopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleCardDelete}
      isDeletingCard={isDeletingCard}
    />
    </CurrentUserContext.Provider>
  </>

  );
}

export default App;
