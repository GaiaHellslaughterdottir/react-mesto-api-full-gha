class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return this._request(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => {
      return res;
    });
  };


  getUserProfileInfo() {
    return this._request(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => {
        return res;
      });
  }

  postUserProfileInfo({name, about}) {
    return this._request(this._baseUrl + '/users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        return res;
      });
  }

  postUserProfileAvatar({avatar}) {
    return this._request(this._baseUrl + '/users/me/avatar', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        return res;
      });
  }

  postPlace({name, link}) {
    return this._request(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        return res;
      });
  }

  deletePlace(_id) {
    return this._request(this._baseUrl + '/cards/' + _id, {
      headers: this._headers,
      method: 'DELETE'
    });
  }

  addPlaceLike(_id) {
    return this._request(this._baseUrl + '/cards/' + _id + '/likes', {
      headers: this._headers,
      method: 'PUT'
    })
      .then((res) => {
        return res;
      });
  }

  removePlaceLike(_id) {
    return this._request(this._baseUrl + '/cards/' + _id + '/likes', {
      headers: this._headers,
      method: 'DELETE'
    })
      .then((res) => {
        return res;
      });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка выполнения запроса: ${res.status}`);
    }
  }

  _request(url, options) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      options.headers.authorization = `Bearer ${token}`;
    }
    return fetch(url, options).then(this._checkResponse)
  }

}

export const api = new Api({
  baseUrl: 'https://backend.564148.msk-kvm.ru/',
  headers: {'Content-Type': 'application/json'}
});