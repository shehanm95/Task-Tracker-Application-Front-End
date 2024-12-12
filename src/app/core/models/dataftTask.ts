import { ICategory } from "./icategory";

export interface IDraftTask {
    topic: string,
    categoryId: number,
    description: string,
    startingDate: string,
    dueDate: string
}