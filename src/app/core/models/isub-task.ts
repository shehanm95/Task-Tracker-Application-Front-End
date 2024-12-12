import { ISimpleTask } from "./isimple-task";
import { ITask } from "./itask";

export interface ISubTask {

    id: number;
    subTaskName: string;
    isFinished: boolean;
    taskDto: ISimpleTask;

}
