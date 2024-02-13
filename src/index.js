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


const submitEditProfileForm = (evt) => {
  evt.preventDefault()

  profName.textContent = forms.editProfile.name.value
  profDesc.textContent = forms.editProfile.description.value

  forms.editProfile.reset()

  closeModal(evt)
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
  placesList.prepend(createCard(name, url, deleteCard, likeCard, openCardPopup))

  forms.newPlace.reset()
  closeModal(evt)
}

forms.newPlace.addEventListener('submit', addCard)

const openCardPopup = (evt) => {
  popupImg.src = evt.target.src
  popupDesc.textContent = evt.target.closest('.card').children[2].children[0].textContent
  popupImg.alt = popupDesc.textContent

  openModal(cardPopup)
}

const openPopupAdd = () => {
  openModal(addPopup)
}

initialCards.forEach((elm) => {
  placesList.append(createCard(elm.name, elm.link, deleteCard, likeCard, openCardPopup))
})

closePopup.forEach((elm) => {
  elm.addEventListener('click', closeModal)
})

popups.forEach((popup) => popup.classList.add('popup_is-animated'))

editBtn.addEventListener('click', openPopupEdit)
addBtn.addEventListener('click', openPopupAdd)


export {popups}