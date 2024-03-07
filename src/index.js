import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, likeCard, deleteCard } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'
import { validationConfig } from "./cfg/config.js";
import { enableValidation, clearValidation } from './scripts/validation.js'
import { loadCards, patchProfile, getProfileInfo, addCardToServer, deleteCardFromServer, updateAvatarOnServer, addLike, removeLike, cardCfg, updFirstCard } from './scripts/api.js'

const placesList = document.querySelector('.places__list')
const forms = document.forms

const editBtn = document.querySelector('.profile__edit-button')
const addBtn = document.querySelector('.profile__add-button')
const avatarBtn = document.querySelector('.profile__image')

const editPopup = document.querySelector('.popup_type_edit')
const addPopup = document.querySelector('.popup_type_new-card')
const cardPopup = document.querySelector('.popup_type_image')
const delPopup = document.querySelector('.popup_type_delete')
const avatarPopup = document.querySelector('.popup_type_avatar')
const popupsClose = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll('.popup')

const profName = document.querySelector('.profile__title')
const profDesc = document.querySelector('.profile__description')
const profImg = document.querySelector('.profile__image')

getProfileInfo(profName, profDesc, profImg)
loadCards(createCard, placesList, deleteCard, likeCard)

const popupImg = document.querySelector('.popup__image')
const popupDesc = document.querySelector('.popup__caption')

const toggleLikeOnCard = (evt) => {
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    addLike(evt.target.closest('.card').id.slice(4))
    evt.target.classList.add('card__like-button_is-active')
  } else {
    removeLike(evt.target.closest('.card').id.slice(4))
    evt.target.classList.remove('card__like-button_is-active')
  }

  // loadCards(createCard, placesList, deleteCard, likeCard)
}

const openAvatarPopup = (evt) => {
  clearValidation(forms.updateAvatar, validationConfig)
  openModal(avatarPopup)
}

const submitAvatarUpdate = (evt) => {
  evt.preventDefault()
  const newAvatar = forms.updateAvatar.url.value
  avatarBtn.setAttribute('style', `background-image: url(${newAvatar})`)
  updateAvatarOnServer(newAvatar)

  forms.updateAvatar.reset()
  closeModal(avatarPopup)
}


const submitEditProfileForm = (evt) => {
  evt.preventDefault()

  profName.textContent = forms.editProfile.name.value
  profDesc.textContent = forms.editProfile.description.value

  patchProfile(forms.editProfile.name.value, forms.editProfile.description.value)

  forms.editProfile.reset()

  closeModal(evt.target.closest('.popup'))
}

const openDelPopup = (evt) => {
  openModal(delPopup)
  const delCardId = evt.target.closest('.card').id
  document.querySelector(`#${delCardId}`).classList.add('deleteThis')
}

const submitDeleteCard = (evt) => {
  evt.preventDefault()
  const cardToDelete = document.querySelector('.deleteThis')
  deleteCardFromServer(cardToDelete)
  cardToDelete.classList.remove('deleteThis')
  cardToDelete.remove()
  closeModal(delPopup)
}

const openPopupEdit = () => {
  const name = profName.textContent
  const desc = profDesc.textContent

  clearValidation(forms.editProfile, validationConfig)

  forms.editProfile.name.value = name
  forms.editProfile.description.value = desc

  openModal(editPopup)
}


const addCard = (evt) => {
  evt.preventDefault()

  const name = forms.newPlace.placeName.value
  const url = forms.newPlace.link.value
  addCardToServer(name, url, deleteCard, likeCard, placesList, createCard)

  forms.newPlace.reset()
  closePopup(evt)
}

const openCardPopup = (name, link) => {
  popupImg.src = link
  popupDesc.textContent = name
  popupImg.alt = name

  openModal(cardPopup)
}

const openPopupAdd = () => {
  openModal(addPopup)
  clearValidation(forms.newPlace, validationConfig)
}

const closePopup = (evt) => {
  closeModal(evt.target.closest('.popup'))
}

popupsClose.forEach((elm) => {
  elm.addEventListener('click', closePopup)
})

popups.forEach((popup) => popup.classList.add('popup_is-animated'))

forms.editProfile.addEventListener('submit', submitEditProfileForm)
forms.newPlace.addEventListener('submit', addCard)
forms.deleteCard.addEventListener('submit', submitDeleteCard)
forms.updateAvatar.addEventListener('submit', submitAvatarUpdate)

editBtn.addEventListener('click', openPopupEdit)
addBtn.addEventListener('click', openPopupAdd)
avatarBtn.addEventListener('click', openAvatarPopup)

enableValidation(validationConfig);

export { closePopup, openCardPopup, openDelPopup, toggleLikeOnCard }