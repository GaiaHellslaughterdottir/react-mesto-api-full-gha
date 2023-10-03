import React from "react";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register"
import {api} from "../utils/Api";
import {auth} from "../utils/auth";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import SignOut from "./SignOut";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isToolTipOpen, setToolTipOpen] = React.useState(false);
  const [isRegisterSuccess, setRegisterSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null && !loggedIn) {
      setLoggedIn(true);
      getAuthUserInfo(token);
    }
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
        api.getInitialCards()
          .then((cardList) => {
            if (cardList.length > 0) {
              setCards(cardList);
            }
            navigate('/', {replace: true});
          })
          .catch(err => {
            console.log(err);
          });
      }
  }, [userInfo]);

  function getAuthUserInfo(token) {
    auth.getUserInfo(token)
      .then((userInfo) => {
        setUserInfo(userInfo);
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  function handleCardLike(card) {
    const isLiked = !(card.likes.some(i => i === currentUser._id));

    if (isLiked) {
      api.addPlaceLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.removePlaceLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deletePlace(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setToolTipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser({name, about}) {
    api.postUserProfileInfo({name: name, about: about})
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({email, password}) {
    auth.postSignIn({email: email, password: password})
      .then(({token}) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
        getAuthUserInfo(token);
        window.location.replace('/')
      })
      .catch((err) => {
        console.log(err);
        setRegisterSuccess(false);
        setToolTipOpen(true);
      });
  }

  function handleRegister({email, password}) {
    auth.postSignUp({email: email, password: password})
      .then(({data}) => {
        setRegisterSuccess(true);
        setToolTipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setRegisterSuccess(false);
        setToolTipOpen(true);
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.postUserProfileAvatar({avatar: avatar})
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.postPlace({name: name, link: link})
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setUserInfo({});
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/', {replace: true});
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header loggedIn={loggedIn} userInfo={userInfo}/>

        <Routes>
          <Route path="/"
                 element={loggedIn ?
                   <ProtectedRouteElement element={Main} cards={cards} onEditProfile={handleEditProfileClick}
                                          onAddPlace={handleAddPlaceClick}
                                          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                                          onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                                          loggedIn={loggedIn}/> : <Navigate to="/signin" replace/>}/>
          <Route path="signin" element={<Login onLogin={handleLogin}/>}/>

          <Route path="signup" element={<Register onRegister={handleRegister}/>}/>

          <Route path="signout" element={<SignOut onSignOut={handleSignOut}/>}/>


        </Routes>


        {loggedIn && <Footer/>}

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

        <PopupWithForm title="Вы уверены?" name="place-delete" buttonTitle="Да"/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>

        <InfoTooltip isOpen={isToolTipOpen} onClose={closeAllPopups} isSuccess={isRegisterSuccess}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
