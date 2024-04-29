import { Injectable, inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, map, of} from "rxjs";
import { LoggedInResponse } from "../models/auth/loggedIn-response";


@Injectable({
    providedIn: 'root'
})
class UserGuard {
    constructor (private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {

        return this.authService.isLoggedIn().pipe(
            map((response: LoggedInResponse) => {
                console.log(response);
                if (response.is_user) {
                    return true;
                } 
                this.router.navigate(['/unauthorized']);
                return false;
            })
        );
    }
}

export const canActivateUser: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(UserGuard).canActivate();
}
