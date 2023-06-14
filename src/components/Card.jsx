import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {name, link, likes} = props.card
  const isOwn = props.card.owner._id === currentUser._id
  const isLiked = props.card.likes.some(i => i._id === currentUser._id)
  
  const handleCardClick = () => props.onCardClick(props.card)
  const handleLikeClick = () => props.onCardLike(props.card)
  const handleCardDeleteReq = () => props.onCardDeleteReq(props.card)

  return (
    <article className="element">
        {isOwn && 
        <button 
          className="element__delete-button" 
          data-button="delete"
          onClick={handleCardDeleteReq}
        >
        </button>}
        <img onClick={handleCardClick} className="element__image" src={link}
        alt={name}/>
        <div className="element__info">
        <h2 className="element__heading">{name}</h2>
        <div className="element__like-container">
            <button 
              type="button" 
              data-button="like"
              className={`element__like ${isLiked && 'element__like_active'}`}
              onClick={handleLikeClick}
            >
              </button>
            <p className="element__like-counter">{likes.length}</p>
        </div>
        </div>
    </article>

    );
}

export default Card;