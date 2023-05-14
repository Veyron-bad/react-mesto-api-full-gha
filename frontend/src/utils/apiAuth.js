class ApiAuth {
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

    userRegistrate(formData) {
        return fetch(this._baseUrl + 'signup', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        })

        .then((res) => {
            return this._isOk(res)
        })
    }

    userAuthorization(data) {
        return fetch(this._baseUrl + 'signin', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            credentials: 'include'
        })

        .then((res) => {
            return this._isOk(res)
        })
    }

    useLogout() {
        return fetch(this._baseUrl + 'signout', {
            method: 'POST',
            headers: this._headers,
            credentials: 'include'
        })
    }

    checkToken() {
        return fetch(this._baseUrl + 'users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })

        .then((res) => {
            return this._isOk(res)
        })
    }
}

const apiAuth = new ApiAuth({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiAuth