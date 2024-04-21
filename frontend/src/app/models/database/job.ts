import { Application } from "./application"
import { Category } from "./category"
import { Company } from "./company"
import { Skill } from "./skill"

export interface Job {
    id: number, 
    title: string, 
    description: string, 
    salary: number, 
    location: string 
    company: Company,
    category: Category,
    skills: Skill[],
    applications: Application[]
}
