const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7/',
  baseHeaders: {
    authorization: '16c74c35-c061-46ba-a700-55d16a046848',
    'Content-Type': 'application/json',
  }
}

export { validationConfig, apiConfig }