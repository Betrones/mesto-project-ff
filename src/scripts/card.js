const createCard = (cardName, cardLink, delFn, likeFn, popupFn) => {
  const cardTemplateClone = document.querySelector('#card-template').content.cloneNode(true)

  cardTemplateClone.querySelector('.card__image').src = cardLink
  cardTemplateClone.querySelector('.card__title').textContent = cardName

  const deleteButton = cardTemplateClone.querySelector('.card__delete-button')
  const likeButton = cardTemplateClone.querySelector('.card__like-button')
  const cardImage = cardTemplateClone.querySelector('.card__image')

  deleteButton.addEventListener('click', delFn)
  likeButton.addEventListener('click', likeFn)
  cardImage.addEventListener('click', popupFn)

  return cardTemplateClone
}

const deleteCard = (evt) => {
  const deletedCard = evt.target.closest('.card')
  deletedCard.remove()
}

const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active')
}

export {createCard, likeCard, deleteCard}