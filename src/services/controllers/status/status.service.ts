import instance from "../../api.service"

import { Status, CreateStatusRequest, FilterStatusParams } from "./types"

export const create = (payload: CreateStatusRequest) =>
    instance().post<Status>("status", payload)

export const update = (id: number, payload: CreateStatusRequest) =>
    instance().put<Status>(`status/${id}`, payload)

export const destroy = (id: number) => instance().delete(`status/${id}`)

export const getById = (id: number) => instance().get<Status>(`status/${id}`)

export const list = (params: FilterStatusParams) =>
    instance().get<Status[]>(`status`, { params })
