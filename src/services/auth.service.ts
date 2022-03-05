import axios from 'axios';

const API_URL = process.env.REACT_APP_URL;

export const register = (username: string, password: string, passwordConfirm: string) => {
    return axios.post(API_URL + 'auth/register', {
        username,
        password,
        passwordConfirm
    });
}

export const login = (username: string, password: string) => {
    return axios.post(API_URL + 'auth/login', {
        username,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
}

export const logout = () => {
    localStorage.removeItem('user');
}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
}