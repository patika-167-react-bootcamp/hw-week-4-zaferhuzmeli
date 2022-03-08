import instance from '../../api.service';

import { Todo, CreateTodoRequest, FilterTodoParams } from "./types"

export const create = (payload: CreateTodoRequest) =>
    instance().post<Todo>("todo", payload)

export const update = (id: number, payload: CreateTodoRequest) =>
    instance().put<Todo>(`todo/${id}`, payload)

export const destroy = (id: number) => instance().delete(`todo/${id}`)

export const getById = (id: number) => instance().get<Todo>(`todo/${id}`)

export const list = (params: FilterTodoParams) =>
    instance().get<Todo[]>(`todo`, { params })
