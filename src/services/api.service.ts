import axios from 'axios';

const instance = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export default instance;