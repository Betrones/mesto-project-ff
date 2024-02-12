import {popups} from '../index.js'

const openModal = (tar) => {
  tar.classList.add('popup_is-opened')
}

const closeModal = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_is-opened')
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

export { openModal, closeModal }