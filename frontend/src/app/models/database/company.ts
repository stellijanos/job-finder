import { Job } from "./job";

export class Company {
    id: number = 0;
    name: string = '';
    email: string = '';
    website: string = '';
    jobs: Job[] | undefined = []
}
