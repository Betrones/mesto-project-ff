import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, likeCard, deleteCard } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'

const placesList = document.querySelector('.places__list')
const forms = document.forms

const editBtn = document.querySelector('.profile__edit-button')
const addBtn = document.querySelector('.profile__add-button')

const editPopup = document.querySelector('.popup_type_edit')
const addPopup = document.querySelector('.popup_type_new-card')
const cardPopup = document.querySelector('.popup_type_image')
const closePopup = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')

const profName = document.querySelector('.profile__title')
const profDesc = document.querySelector('.profile__description')

const popupImg = document.querySelector('.popup__image')
const popupDesc = document.querySelector('.popup__caption')


const handleFormSubmit = (evt) => {
  evt.preventDefault()

  profName.textContent = forms.editProfile.name.value
  profDesc.textContent = forms.editProfile.description.value

  forms.editProfile.reset()

  closeModal(evt)
}

const openPopupEdit = () => {
  let name = profName.textContent
  let desc = profDesc.textContent

  forms.editProfile.name.value = name
  forms.editProfile.description.value = desc

  forms.editProfile.addEventListener('submit', handleFormSubmit)

  openModal(editPopup)
}


const addCard = (evt) => {
  evt.preventDefault()

  let name = forms.newPlace.placeName.value
  let url = forms.newPlace.link.value
  placesList.prepend(createCard(name, url, deleteCard, likeCard, openCardPopup))

  forms.newPlace.reset()
  closeModal(evt)
}

const openPopupAdd = () => {
  forms.newPlace.addEventListener('submit', addCard)
  
  openModal(addPopup)
}

const openCardPopup = (evt) => {
  popupImg.src = evt.target.src
  popupDesc.textContent = evt.target.closest('.card').children[2].children[0].textContent
  console.log(evt)

  openModal(cardPopup)
}


const openPopup = (evt) => {
  if (evt.target === editBtn) {
    openPopupEdit(evt)
  } else if (evt.target === addBtn) {
    openPopupAdd(evt)
  }
}

for (let i = 0; i < initialCards.length; i++) {
  placesList.append(createCard(initialCards[i].name, initialCards[i].link, deleteCard, likeCard, openCardPopup))
}

for (let i=0; i < closePopup.length; i++) {
  closePopup[i].addEventListener('click', closeModal)
}

for (let i = 0; i < popups.length; i++) {
  popups[i].classList.add('popup_is-animated')
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt)
  }
})

document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    for (let i = 0; i < popups.length; i++) {
      popups[i].classList.remove('popup_is-opened')
    }
  }
})

editBtn.addEventListener('click', openPopup)
addBtn.addEventListener('click', openPopup)


