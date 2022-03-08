// get api service to use all axios services
import instance from './api.service';

export const register = (username: string, password: string, passwordConfirm: string) => {
    return instance().post('auth/register', {
        username,
        password,
        passwordConfirm
    });
}

export const login = (username: string, password: string) => {
    return instance().post('auth/login', {
        username,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            instance().defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data}`
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