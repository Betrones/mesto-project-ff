import { apiConfig } from "../cfg/config";

function loadCards(createCard, placesList, deleteCard, likeCard) {
  fetch(`${apiConfig.baseUrl}cards`, {
    headers: apiConfig.baseHeaders
    }
  )
    .then(res => res.json())
    .then((res) => {
      placesList.innerHTML = ''
      res.forEach(card => {
        placesList.append(createCard(deleteCard, likeCard, card))
      });
    })
    .catch((err) => {console.log(`Ошибка: ${err}`)})
}

function updFirstCard (createCard, placesList, deleteCard, likeCard) {
  fetch(`${apiConfig.baseUrl}cards`, {
    headers: apiConfig.baseHeaders
    }
  )
  .then(res => res.json())
  .then((cardList) => {
    cardCfg = structuredClone(cardList[0])
    placesList.append(createCard(deleteCard, likeCard, cardCfg))
  })
  .catch((err) => {console.log(`Ошибка: ${err}`)})
}

function getProfileInfo(name, desc, img) {
  fetch(`${apiConfig.baseUrl}users/me`, {
    headers: apiConfig.baseHeaders
    }
  )
  .then(res => res.json())
  .then((res)=> {
    name.textContent = res.name
    desc.textContent = res.about
    img.setAttribute('style', `background-image: url(${res.avatar})`)
  })
  .catch((err) => {console.log(`Ошибка: ${err}`)})
}

function patchProfile(name, desc) {
  fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'PATCH',
    headers: apiConfig.baseHeaders,
    body: JSON.stringify({
      name: name,
      about: desc
    })
  })
  .catch((err) => {console.log(`Ошибка: ${err}`)})
}

function addCardToServer(name, link, deleteCard, likeCard, placesList, createCard) {
  fetch(`${apiConfig.baseUrl}cards`, {
    method: 'POST',
    headers: apiConfig.baseHeaders,
    
    body: JSON.stringify({
      name: name,
      link: link
    })
})
  .then((res)=>{return res.json()})
  .then((res) => {
    
    placesList.prepend(createCard(deleteCard, likeCard, res))
    console.log(placesList)
  })
  .catch((err) => {console.log(`Ошибка: ${err}`)})
}

function deleteCardFromServer(card) {
  const id = card.id.slice(4)
  fetch(`${apiConfig.baseUrl}cards/${id}`, {
    method: 'DELETE',
    headers: apiConfig.baseHeaders
    }
  )
}

function updateAvatarOnServer(url) {
  const newAvatar = url
  fetch(`${apiConfig.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.baseHeaders,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
  .catch((err) => {console.log(`Ошибка: ${err}`)})
}

function addLike(id) {
  fetch(`${apiConfig.baseUrl}cards/likes/${id}`, {
    method: 'PUT',
    headers: apiConfig.baseHeaders
    }
  )
  .then(res => res.json())
  .then((res) => {
    document.querySelector(`#card${res._id}`).querySelector('.card__like-counter').textContent=res.likes.length
  })
  .catch((err) => {console.log(`Ошибка: ${err}`)})
}

function removeLike(id) {
  fetch(`${apiConfig.baseUrl}cards/likes/${id}`, {
    method: 'DELETE',
    headers: apiConfig.baseHeaders
    }
  )
  .then(res => res.json())
  .then((res)=> {
    document.querySelector(`#card${res._id}`).querySelector('.card__like-counter').textContent=res.likes.length
  })
  .catch((err) => {console.log(`Ошибка: ${err}`)})
}


export { loadCards, patchProfile, getProfileInfo, addCardToServer, deleteCardFromServer, updateAvatarOnServer, addLike, removeLike, updFirstCard }