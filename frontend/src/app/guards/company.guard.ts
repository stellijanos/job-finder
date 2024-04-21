import { Injectable, inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { LoggedInResponse } from "../models/auth/loggedIn-response";


@Injectable({
    providedIn: 'root'
})
class CompanyGuard {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        let token: string | null = localStorage.getItem('token');

        if (!token) {
            this.router.navigate(['/login']);
            return of(false);
        }

        return this.authService.isLoggedIn(token).pipe(
            map((response: LoggedInResponse) => {
                if (response.is_company) {
                    return true;
                }
                this.router.navigate(['/unauthorized']);
                return false;
            })
        );
    }
}

export const canActivateCompany: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(CompanyGuard).canActivate();
}
