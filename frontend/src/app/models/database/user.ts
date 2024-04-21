
import { Application } from "./application";
import { Job } from "./job";
import { Skill } from "./skill";

export interface User {
    id: number,
    firstname: string, 
    middlename: string, 
    lastname: string, 
    email: string, 
    saved_jobs: Job[],
    skills: Skill[],
    applications: Application[]
}
