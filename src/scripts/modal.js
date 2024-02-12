const openModal = (tar) => {
  tar.classList.add('popup_is-opened')
}

const closeModal = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_is-opened')
}

export { openModal, closeModal }