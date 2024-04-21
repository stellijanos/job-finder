import { Injectable, inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { LoggedInResponse } from "../models/auth/loggedIn-response";

@Injectable({
    providedIn: 'root'  
})
class AuthServiceGuard {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        let token: string| null = localStorage.getItem('token')

        if (!token) {
            return of(true);
        }

        return this.authService.isLoggedIn(token).pipe(
            map((response: LoggedInResponse) => {
                if (!response.is_logged_in) {
                    return true;
                }
                if (response.is_user) {
                    this.router.navigate(['/user']);
                } else if (response.is_company) {
                    this.router.navigate(['/company']);
                } 
                return false;
            })
        );
    }   
}

export const canActivateAuthRoutes: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthServiceGuard).canActivate();
}
