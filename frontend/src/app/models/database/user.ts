
import { Application } from "./application";
import { Job } from "./job";
import { Skill } from "./skill";

export class User {
    id: number = 0;
    firstname: string = '';
    middlename: string = '';
    lastname: string = '';
    email: string = '';
    password: string = '';
    new_password: string = '';
    confirm_new_password: string = '';
    saved_jobs: Job[] | undefined;
    skills: Skill[] | undefined;
    applications: Application[] | undefined;
}
