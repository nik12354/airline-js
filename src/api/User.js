const BL_URL = '/api/';

export default {
    register: (username, password) => {
        const requestUrl = BL_URL + 'register';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then((res) => {
                    if (res.ok) {
                        console.log('Registered successfully');
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
    },

    login: (username, password) => {
        const requestUrl = BL_URL + 'login';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then((res) => {
                    if (res.ok) {
                        console.log('Logged in successfully');
                        console.log(res);
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
}