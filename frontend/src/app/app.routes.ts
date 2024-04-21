import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { canActivateUser } from './guards/user.guard';
import { canActivateCompany } from './guards/company.guard';
import { NotFoundComponent } from './informational/not-found/not-found.component';
import { UnauthorizedComponent } from './informational/unauthorized/unauthorized.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { canActivateAuthRoutes } from './guards/auth-service.guard';
import { AccountDeletedComponent } from './informational/account-deleted/account-deleted.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate: [canActivateAuthRoutes]},
    {path: 'login', component: LoginComponent, canActivate: [canActivateAuthRoutes]},
    {path: 'logout', component: LogoutComponent},
    {path: 'company', component: CompanyComponent, canActivate: [canActivateCompany]},
    {path: 'user', component: UserComponent, canActivate: [canActivateUser]},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'account-deleted', component: AccountDeletedComponent},
    {path: '**', component:NotFoundComponent}
];
