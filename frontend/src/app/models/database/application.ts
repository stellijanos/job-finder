import { Job } from "./job";
import { User } from "./user";

export interface Application {
    id: number, 
    resume: string, 
    cover_letter: string, 
    status: string, 
    user: User,
    job: Job
}
