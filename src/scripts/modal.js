const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}

const closePopupByOverClick = (evt) => {
  if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__content')) {
    closeModal(evt)
  }
}

const openModal = (tar) => {
  tar.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc)
}

const closeModal = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc)
  document.removeEventListener('keydown', closePopupByEsc)
}

export { openModal, closeModal, closePopupByOverClick }