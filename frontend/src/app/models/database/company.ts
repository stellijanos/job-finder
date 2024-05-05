import { Job } from "./job";

export class Company {
    id: number = 0;
    name: string = '';
    email: string = '';
    website: string = '';
    jobs: Job[] = [];
    
    password: string = '';
    new_password: string = '';
    confirm_new_password: string = '';

    response: string = '';
}
