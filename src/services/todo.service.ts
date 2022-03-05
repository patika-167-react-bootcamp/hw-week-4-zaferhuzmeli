import axios from 'axios';


const API_URL = process.env.REACT_APP_URL;

// get category list with axios with which user auth with id
export const getCategoryList = () => {
    return axios.get(API_URL + 'category');
}

// get category list by id with axios
export const getCategoryById = (id: number) => {
    return axios.get(API_URL + 'category/' + id);
}

// create a new category with axios with title key singed user
export const createCategory = (title: string) => {
    return axios.post(API_URL + 'category', { title });
}

// delete category with id
export const deleteCategory = (id: number) => {
    return axios.delete(API_URL + '/category/' + id);
}

// update category with id
export const updateCategory = (id: number, title: string) => {
    return axios.put(API_URL + '/category/' + id, {
        title
    });
}

export const getStatus = () => {
    return axios.get(API_URL + '/status');
}

