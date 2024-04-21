import { Job } from "./job";

export interface Company {
    id: number, 
    name: string,
    email: string, 
    website: string,
    jobs: Job[]
}