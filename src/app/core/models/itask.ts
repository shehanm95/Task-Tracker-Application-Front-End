import { ICategory } from "./icategory";
import { ISubTask } from "./isub-task";

export interface ITask {
    id: number;
    topic: string;
    description: string;
    category: ICategory;
    subTaskDtoList: ISubTask[];
    startingDate: string;
    dueDate: string;
    finishingRate: number;
    isFinished: boolean;
}

