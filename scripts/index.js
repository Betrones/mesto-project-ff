const placesList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content


const createCard = (cardName, cardLink) => {
  const cardTemplateClone = cardTemplate.cloneNode(true)

  cardTemplateClone.querySelector('.card__image').src = cardLink
  cardTemplateClone.querySelector('.card__title').textContent = cardName


  const deleteButton = cardTemplateClone.querySelector('.card__delete-button')

  deleteButton.addEventListener('click', () => {
    const deletedCard = deleteButton.closest('.card')
    deletedCard.remove()
  })


  placesList.append(cardTemplateClone)
}

for (let i = 0; i < initialCards.length; i++) {
  createCard(initialCards[i].name, initialCards[i].link)
}
