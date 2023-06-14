import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import Header from './Header.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ProtectedRoute from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx'


import api from '../utils/api.js'
import {register, validate, signin} from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const ImagePopup = React.lazy(() => import('./ImagePopup.jsx'))  
const Main = React.lazy(() => import('./Main.jsx'))  
const ProfilePopup = React.lazy(() => import('./ProfilePopup.jsx'))  
const AvatarPopup = React.lazy(() => import('./AvatarPopup.jsx'))  
const PlacePopup = React.lazy(() => import('./PlacePopup.jsx'))  
const ConfirmPopup = React.lazy(() => import('./ConfirmPopup.jsx'))  



function Root() {
  // hooks
  const [isProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
  const [isPlacePopupOpen, setPlacePopupOpen] = React.useState(false)
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  const [currentUser , setCurrentUser ] = React.useState({})
  const [cards, setCards] = React.useState([]) 
  const [deletingCard, setDeletingCard] = React.useState({})

  const [isLoadingUserData, setIsLoadingUserData] = React.useState(false);
  const [isLoadingPlace, setIsLoadingPlace] = React.useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = React.useState(false);
  const [isDeletingCard, setIsDeletingCard] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    if (!loggedIn) return
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
  }, [loggedIn])

  useEffect(() => {
    if (!localStorage.getItem('jwt')) return

    const authorizeOnLoad = async () => {
      const token = localStorage.getItem('jwt')
      authorize(token)
    }

    authorizeOnLoad()
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
    setInfoTooltipOpen(false)
    setSelectedCard({})
  }

    // selected card
  const handleCardClick = async (card) => {
    setSelectedCard(card)
    await new Promise(r => setTimeout(r, 40))
    setImagePopupOpen(true)
  }

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    try {
      const res = await api.changeLikeCardStatus(card._id, isLiked)
      setCards(state => state.map(c => c._id === card._id ? res : c))

    } catch (e) { console.log(e) }
  } 

  const handleCardDelete = async () => {
    setIsDeletingCard(true)
    try {
      await api.deleteCard(deletingCard._id)
      setCards(state => state.filter(c => c._id !== deletingCard._id))
      closeAllPopups()
    } 
    catch (e) { console.log(e) } 
    finally { setIsDeletingCard(false) }
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
    } 
    catch (e) { console.log(e) }
    finally { setIsLoadingUserData(false) }
  }

  const handleUpdateAvatar = async (a) => {
    setIsLoadingAvatar(true)
    try {
      const res = await api.editAvatar(a)
      setCurrentUser(res)
      closeAllPopups()
    } 
    catch (e) { console.log(e) } 
    finally { setIsLoadingAvatar(false) }
  }

  const handleAddPlace = async place => {
    setIsLoadingPlace(true)
    try {
      const res = await api.addCard(place)
      setCards([res, ...cards])
      closeAllPopups()
    } 
    catch (e) { console.log(e) } 
    finally { setIsLoadingPlace(false) }
  }

  const [email, setEmail] = React.useState('')
  const [success, setSuccess] = React.useState(null)

  const handleLogin = async (data) => {
    try {
      const {token} = await signin(data)
        
      if (!token) throw Error('токен неверный')
      localStorage.setItem('jwt', token)

      authorize(token)
    } 
    catch (e) { 
      console.log(e) 
      setSuccess(false)
      setInfoTooltipOpen(true)
    }
  }

  const authorize = async (token) => {
    try {
      const loginInfo = await getData(token)
      const {data: {_id, email}} = loginInfo

      setEmail(email)
      setLoggedIn(true)
      setSuccess(true)
      navigate('/')

    } catch (e) {
      console.log(e)
      setSuccess(false)
      setInfoTooltipOpen(true)
    }
  }

  const getData = async (token) => {
    const res = await validate(token)
    return res
  }

  const handleRegister = async (data) => {
    console.log('reg ',data);
    try {
      const r = await register(data)
      console.log(r)
      setSuccess(true)
      navigate('/sign-in')
    } 
    catch (e) {
      setSuccess(false)
      console.log(e)
    }
    finally { setInfoTooltipOpen(true) }
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt')

    setLoggedIn(false)
    setSuccess(null)
    setEmail('')
    navigate('/sign-in')
  }

  return (
  <>
    <CurrentUserContext.Provider value={currentUser}>
    <Header loggedIn={loggedIn} email={email} signOut={handleSignOut}/>
      <Routes>
        <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
        <Route element={
        <ProtectedRoute
          loggedIn={loggedIn}
        />
        }>
          <Route
            path="/" 
            element={
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDeleteReq={handleCardDeleteReq}
            />
          } 
          />
        </Route>
      </Routes>

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
    <InfoTooltip 
      isOpen={isInfoTooltipOpen}  
      onClose={closeAllPopups}
      success={success}
    />
    </CurrentUserContext.Provider>

  </>

  );
}

function App() {
  return (
    <BrowserRouter>
    <Root/>
    </BrowserRouter>
  )

}

export default App;
