import {popups} from '../index.js'

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}

const openModal = (tar) => {
  tar.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc)
}

const closeModal = (evt) => {
  evt.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt)
  }
})



export { openModal, closeModal }