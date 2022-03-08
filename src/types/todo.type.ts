export default interface Todo {
    id: number
    title: string
    categoryId: number
    statusId: number
    updatedAt: string
    createdAt: string
}

export type CreateTodoRequest = Pick<Todo, "title" | "categoryId" | "statusId">
export type FilterTodoParams = Omit<Todo, "createdAt" | "updatedAt">