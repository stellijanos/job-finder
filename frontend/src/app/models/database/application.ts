import { Job } from "./job";
import { User } from "./user";

export class Application {
    id: number = 0;
    resume: string = '';
    cover_letter: string = '';
    status: string = '';
    user: User | undefined;
    job: Job | undefined;
}
