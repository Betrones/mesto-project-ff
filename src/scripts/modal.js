import { closePopup } from "../index.js"

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}

const closePopupByOverClick = (evt) => {
  if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__conent')) {
    closePopup(evt)
  }
}

const openModal = (tar) => {
  tar.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc)
}

const closeModal = (evt) => {
  evt.classList.remove('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc)
  document.removeEventListener('keydown', closePopupByEsc)
}

document.addEventListener('click', closePopupByOverClick)

export { openModal, closeModal }