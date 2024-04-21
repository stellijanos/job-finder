import { Job } from "./job";
import { User } from "./user";

export class Skill {
    id: number = 0;
    name: string = '';
    jobs: Job[] | undefined;
    users: User[] | undefined;
}
