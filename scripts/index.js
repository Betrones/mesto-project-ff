const placesList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content


const createCard = (cardName, cardLink, delFn) => {
  const cardTemplateClone = cardTemplate.cloneNode(true)

  cardTemplateClone.querySelector('.card__image').src = cardLink
  cardTemplateClone.querySelector('.card__title').textContent = cardName


  const deleteButton = cardTemplateClone.querySelector('.card__delete-button')

  deleteButton.addEventListener('click', delFn)


  return cardTemplateClone
}

const deleteCard = (evt) => {
  const deletedCard = evt.target.closest('.card')
  deletedCard.remove()
}

for (let i = 0; i < initialCards.length; i++) {
  placesList.append(createCard(initialCards[i].name, initialCards[i].link, deleteCard))
}
