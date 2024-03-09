import '../pages/index.css';
import { createCard } from './scripts/card.js'
import { openModal, closeModal, closePopupByOverClick } from './scripts/modal.js'
import { validationConfig } from "./cfg/config.js";
import { enableValidation, clearValidation } from './scripts/validation.js'
import { getCardsData, patchProfile, getProfileInfo, uploadCard, deleteCardFromServer, updateAvatarOnServer } from './scripts/api.js'

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

const popupImg = document.querySelector('.popup__image')
const popupDesc = document.querySelector('.popup__caption')

let userId

Promise.all([getCardsData(), getProfileInfo()])
.then(([cardArr, profData]) => {
  userId = profData._id
  renderCards(cardArr)
  updProfileInfo(profData)
})
.catch(err => console.log(err))

const renderCards = (cardList) => {
  placesList.innerHTML = ''
  cardList.forEach((card) => {
    placesList.append(createCard(card, openCardPopup, openDelPopup, userId))
  })
}

const updProfileInfo = (profData) => {
  profName.textContent = profData.name
  profDesc.textContent = profData.about
  profImg.setAttribute('style', `background-image: url(${profData.avatar})`)
}

const openAvatarPopup = (evt) => {
  clearValidation(forms.updateAvatar, validationConfig)
  openModal(avatarPopup)
}

const setButtonLoadingText = (target) => {
  target.querySelector('.popup__button').textContent = 'Сохранение...'
}

const resetButtonLoadingText = (target) => {
  target.querySelector('.popup__button').textContent = 'Сохранить'
}

const submitAvatarUpdate = (evt) => {
  evt.preventDefault()

  setButtonLoadingText(evt.target)

  const newAvatar = forms.updateAvatar.url.value

  updateAvatarOnServer(newAvatar)
  .then(() => {
    avatarBtn.setAttribute('style', `background-image: url(${newAvatar})`)
    forms.updateAvatar.reset()
    closeModal(evt)
  })
  .finally(() => {
    resetButtonLoadingText(evt.target)
  })
  .catch(err => console.log(err))
}


const submitEditProfileForm = (evt) => {
  evt.preventDefault()

  setButtonLoadingText(evt.target)

  patchProfile(forms.editProfile.name.value, forms.editProfile.description.value)
  .then(() => {
    profName.textContent = forms.editProfile.name.value
    profDesc.textContent = forms.editProfile.description.value
    forms.editProfile.reset()
    closeModal(evt)
  })
  .finally(() => {
    resetButtonLoadingText(evt.target)
  })
  .catch(err => console.log(err))
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
  .then(() => {
    cardToDelete.classList.remove('deleteThis')
    cardToDelete.remove()
    closeModal(evt)
  })
  .catch(err => console.log(err))
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
  setButtonLoadingText(evt.target)

  const name = forms.newPlace.placeName.value
  const url = forms.newPlace.link.value
  uploadCard(name, url)
  .then((cardData) => {
    console.log(cardData)
    placesList.prepend(createCard(cardData, openCardPopup, openDelPopup, userId))
  })
  .then(() => {
    forms.newPlace.reset()
    closeModal(evt)
  })
  .finally(() => {
    resetButtonLoadingText(evt.target)
  })
  .catch(err => console.log(err))
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


popupsClose.forEach((elm) => {
  elm.addEventListener('click', closeModal)
})

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
  popup.addEventListener('click', closePopupByOverClick)
})

forms.editProfile.addEventListener('submit', submitEditProfileForm)
forms.newPlace.addEventListener('submit', addCard)
forms.deleteCard.addEventListener('submit', submitDeleteCard)
forms.updateAvatar.addEventListener('submit', submitAvatarUpdate)

editBtn.addEventListener('click', openPopupEdit)
addBtn.addEventListener('click', openPopupAdd)
avatarBtn.addEventListener('click', openAvatarPopup)

enableValidation(validationConfig);