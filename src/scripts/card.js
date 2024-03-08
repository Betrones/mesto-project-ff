import { addLike, removeLike } from "./api";

const toggleLikeOnCard = (evt) => {
  const likedCardId = evt.target.closest('.card').id.slice(4)

  if (!evt.target.classList.contains('card__like-button_is-active')) {
    addLike(likedCardId)
    .then((likedCard) => {
      document.querySelector(`#card${likedCard._id}`).querySelector('.card__like-counter').textContent = likedCard.likes.length
    })
    .catch(err => console.log(err))
  } else {
    removeLike(likedCardId)
    .then((likedCard) => {
      document.querySelector(`#card${likedCard._id}`).querySelector('.card__like-counter').textContent = likedCard.likes.length
    })
    .catch(err => console.log(err))
  }

  evt.target.classList.toggle('card__like-button_is-active')
}

const createCard = (cardCfg, openCardPopup, openDelPopup, userId) => {
  const cardTemplateClone = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true)

  if (cardCfg.owner._id !== userId) {
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

  deleteButton.addEventListener('click', (evt) => openDelPopup(evt))
  likeButton.addEventListener('click', (evt) => toggleLikeOnCard(evt))
  cardImage.addEventListener('click', () => openCardPopup(cardCfg.name, cardCfg.link))

  cardCfg.likes.forEach(like => {
    if (like._id === userId) {
      likeButton.classList.add('card__like-button_is-active')
    } else {
      likeButton.classList.remove('card__like-button_is-active')
    }
  });

  return cardTemplateClone
}

export { createCard }