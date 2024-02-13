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
const popupsClose = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')

const profName = document.querySelector('.profile__title')
const profDesc = document.querySelector('.profile__description')

const popupImg = document.querySelector('.popup__image')
const popupDesc = document.querySelector('.popup__caption')


const submitEditProfileForm = (evt) => {
  evt.preventDefault()

  profName.textContent = forms.editProfile.name.value
  profDesc.textContent = forms.editProfile.description.value

  forms.editProfile.reset()

  closeModal(evt.target.closest('.popup'))
}

forms.editProfile.addEventListener('submit', submitEditProfileForm)

const openPopupEdit = () => {
  const name = profName.textContent
  const desc = profDesc.textContent

  forms.editProfile.name.value = name
  forms.editProfile.description.value = desc

  openModal(editPopup)
}


const addCard = (evt) => {
  evt.preventDefault()

  const name = forms.newPlace.placeName.value
  const url = forms.newPlace.link.value
  placesList.prepend(createCard(name, url, deleteCard, likeCard))

  forms.newPlace.reset()
  closePopup(evt)
}

forms.newPlace.addEventListener('submit', addCard)

const openCardPopup = (name, link) => {
  popupImg.src = link
  popupDesc.textContent = name
  popupImg.alt = name

  openModal(cardPopup)
}

const openPopupAdd = () => {
  openModal(addPopup)
}

initialCards.forEach((elm) => {
  placesList.append(createCard(elm.name, elm.link, deleteCard, likeCard))
})

const closePopup = (evt) => {
  closeModal(evt.target.closest('.popup'))
}

popupsClose.forEach((elm) => {
  elm.addEventListener('click', closePopup)
})

popups.forEach((popup) => popup.classList.add('popup_is-animated'))

editBtn.addEventListener('click', openPopupEdit)
addBtn.addEventListener('click', openPopupAdd)

export { closePopup, openCardPopup }