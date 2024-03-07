import { openCardPopup, openDelPopup, toggleLikeOnCard } from '../index'

const createCard = (delFn, likeFn, cardCfg) => {
  const cardTemplateClone = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true)

  if (cardCfg.owner._id !== "8d457b6c91b7578275b3a7b8") {
    cardTemplateClone.querySelector('.card__delete-button').setAttribute('style', 'display: none')
  }

  const deleteButton = cardTemplateClone.querySelector('.card__delete-button')
  const likeButton = cardTemplateClone.querySelector('.card__like-button')
  const likeCounter = cardTemplateClone.querySelector('.card__like-counter')
  const cardImage = cardTemplateClone.querySelector('.card__image')
  cardTemplateClone.setAttribute('id', `card${cardCfg._id}`)

  cardImage.src = cardCfg.link
  cardImage.alt = cardCfg.name
  likeCounter.textContent = cardCfg.likes.length
  cardTemplateClone.querySelector('.card__title').textContent = cardCfg.name

  deleteButton.addEventListener('click', delFn)
  likeButton.addEventListener('click', likeFn)
  cardImage.addEventListener('click', (evt) => openCardPopup(cardCfg.name, cardCfg.link))

  cardCfg.likes.forEach(like => {
    if (like._id === '8d457b6c91b7578275b3a7b8') {
      likeButton.classList.add('card__like-button_is-active')
    } else {
      likeButton.classList.remove('card__like-button_is-active')
    }
  });
  

  return cardTemplateClone
}

const deleteCard = (evt) => {
  const deletedCard = evt.target.closest('.card')
  openDelPopup(evt)
  // deletedCard.remove()
}

const likeCard = (evt) => {
  toggleLikeOnCard(evt)
}

export {createCard, likeCard, deleteCard}