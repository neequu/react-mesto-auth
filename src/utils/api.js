class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl
      this._headers = options.headers
    }

    _checkResponse(res) {
        if (res.ok) return res.json()

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => this._checkResponse(res))
    }

    addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(res => this._checkResponse(res));
    } 

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => this._checkResponse(res));
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
          })
          .then(res => this._checkResponse(res))
    }
    
    editUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(res => this._checkResponse(res)) 
    }

    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
        .then(res => this._checkResponse(res));
    }

    changeLikeCardStatus(id, isLiked) {
      return isLiked ? this.deleteLike(id) :  this.setLike(id)
    }
    
    setLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }

    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._checkResponse(res));
    }
}

// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'd9a56d97-fcff-4775-997d-668b8fda98e2',
    'Content-Type': 'application/json'
  }
})

export default api
  
