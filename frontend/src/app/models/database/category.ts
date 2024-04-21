import { Job } from "./job";

export interface Category {
    id: number,
    name: string,
    jobs: Job[]
}
