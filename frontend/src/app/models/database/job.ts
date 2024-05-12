import { Application } from "./application"
import { Category } from "./category"
import { Company } from "./company"
import { Skill } from "./skill"

export class Job {
    id: Number = 0;
    title: string = '';
    description: string = ''; 
    salary: number = 0;
    location: string = '';
    type : string = '';
    company !: Company; 
    category !: Category;
    skills: Skill[] = [];
    applications: Application[] = [];
}
