import { Job } from "./job";
import { User } from "./user";

export interface Skill {
    id: number, 
    name: string, 
    jobs: Job[],
    users: User[]
}
