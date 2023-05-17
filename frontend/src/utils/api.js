class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _isOk(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}!`)
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers,
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }

    addLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }

    deleteLike(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers,
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }

    editProfileInfo(userData) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData),
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }

    editProfileAvatar(userData) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData),
            credentials: 'include'
        })

            .then((res) => {
                return this._isOk(res);
            })
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api
