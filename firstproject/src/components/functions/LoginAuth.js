import axios from 'axios';
import { globalStore } from '../../main.js';

const getUserData = (login, password) => {
    const userData = {
        login,
        password
    }
    return new Promise((resolve, reject) => {
        if (userData.login !== (undefined || '') && userData.password !== (undefined || '')) {
            resolve(userData);
        } else {
            reject(new Error('Błąd! Spróbuj ponownie.'));
        }
    });
}

const validate = (res) => {
    return new Promise((resolve, reject) => {
        axios
            .post('http://192.168.1.35:4000/users', res)
            .then((response) => {
                resolve(response)
            })
            .catch((err) => {
                reject(new Error(err));
            });
    })
}

const loginUser = (response) => {
    return new Promise((resolve, reject) => {
        if (response.data === "d688c4ccd7e20183b67f80d8816a2126") {
            resolve(clientSideLoginTrue(JSON.parse(response.config.data).login));
        } else {
            reject(new Error('Błąd! Spróbuj ponownie.'), clientSideLoginFalse);
        }
    })
}


const clientSideLoginTrue = (response) => {
    globalStore.isAuthenticated = true;
    globalStore.globalUser = response;
}
const clientSideLoginFalse = () => {
    globalStore.isAuthenticated = false;
    globalStore.globalUser = '';
}


export const authUser = async (login, password) => {
    return await getUserData(login, password)
        .then((res) => validate(res))
        .then((response) => loginUser(response))
        .catch((err) => {
            console.log(err);
        });
}