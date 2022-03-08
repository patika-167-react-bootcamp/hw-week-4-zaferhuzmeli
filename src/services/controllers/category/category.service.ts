import instance from '../../api.service';
import { Category, CreateCategoryRequest } from "./types"

// create a new category with axios with title key singed user
export const createCategory = (payload: CreateCategoryRequest) => {
    instance().post<Category>('category', payload);
}

// get category list with axios with which user auth with id
export const getCategoryList = () => {
    instance().get<Category[]>('category');
}

// get category list by id with axios
export const getCategoryById = (id: number) => {
    instance().get<CreateCategoryRequest>(`category/${id}`);
}

// delete category with id
export const deleteCategory = (id: number) => { instance().delete(`/category/${id}`) }

// update category with id
export const updateCategory = (id: number, payload: CreateCategoryRequest) => {
    instance().put(`/category/${id}`, payload);
}