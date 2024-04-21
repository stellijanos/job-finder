import { Application } from "./application"
import { Category } from "./category"
import { Company } from "./company"
import { Skill } from "./skill"

export class Job {
    id: number = 0;
    title: string = '';
    description: string = ''; 
    salary: number = 0;
    location: string = '';
    company: Company | undefined; 
    category: Category | undefined;
    skills: Skill[] | undefined;
    applications: Application[] | undefined;
}
