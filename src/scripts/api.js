import { apiConfig } from "../cfg/config";

function getCardsData() {
  return fetch(`${apiConfig.baseUrl}cards`, {
    headers: apiConfig.baseHeaders
    }
  )
    .then(getResponseData)
}

function getProfileInfo() {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    headers: apiConfig.baseHeaders
    }
  )
  .then(getResponseData)
}

function patchProfile(name, desc) {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'PATCH',
    headers: apiConfig.baseHeaders,
    body: JSON.stringify({
      name: name,
      about: desc
    })
  })
  .then(getResponseData)
}

function uploadCard(name, link) {
  return fetch(`${apiConfig.baseUrl}cards`, {
    method: 'POST',
    headers: apiConfig.baseHeaders,
    
    body: JSON.stringify({
      name: name,
      link: link
    })
})
  .then(getResponseData)
}

function deleteCardFromServer(card) {
  const id = card.id.slice(4)
  return fetch(`${apiConfig.baseUrl}cards/${id}`, {
    method: 'DELETE',
    headers: apiConfig.baseHeaders
    }
  )
}

function updateAvatarOnServer(url) {
  const newAvatar = url
  return fetch(`${apiConfig.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.baseHeaders,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
  .then(getResponseData)
}

function addLike(id) {
  return fetch(`${apiConfig.baseUrl}cards/likes/${id}`, {
    method: 'PUT',
    headers: apiConfig.baseHeaders
    }
  )
  .then(getResponseData)
}

function removeLike(id) {
  return fetch(`${apiConfig.baseUrl}cards/likes/${id}`, {
    method: 'DELETE',
    headers: apiConfig.baseHeaders
    }
  )
  .then(getResponseData)
}

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export { getCardsData, patchProfile, getProfileInfo, uploadCard, deleteCardFromServer, updateAvatarOnServer, addLike, removeLike }