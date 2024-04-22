import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CompanyComponent } from './company/company.component';
import { canActivateUser } from './guards/user.guard';
import { canActivateCompany } from './guards/company.guard';
import { NotFoundComponent } from './informational/not-found/not-found.component';
import { UnauthorizedComponent } from './informational/unauthorized/unauthorized.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { canActivateAuthRoutes } from './guards/auth-service.guard';
import { AccountDeletedComponent } from './informational/account-deleted/account-deleted.component';
import { AccountDetailsComponent } from './user/options/account-details/account-details.component';
import { ChangePasswordComponent } from './user/options/change-password/change-password.component';
import { DeleteAccountComponent } from './user/options/delete-account/delete-account.component';
import { JobApplicationsComponent } from './user/options/job-applications/job-applications.component';
import { SavedJobsComponent } from './user/options/saved-jobs/saved-jobs.component';
import { UserHomeComponent } from './user/options/user-home/user-home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate: [canActivateAuthRoutes]},
    {path: 'login', component: LoginComponent, canActivate: [canActivateAuthRoutes]},
    {path: 'logout', component: LogoutComponent},
    {path: 'company', component: CompanyComponent, canActivate: [canActivateCompany]},
    
    {path: 'user', component: UserHomeComponent, canActivate: [canActivateUser]},
    {path: 'user/account-details', component: AccountDetailsComponent, canActivate: [canActivateUser]},
    {path: 'user/change-password', component: ChangePasswordComponent, canActivate: [canActivateUser]},
    {path: 'user/delete-account', component: DeleteAccountComponent, canActivate: [canActivateUser]},
    {path: 'user/job-applications', component: JobApplicationsComponent, canActivate: [canActivateUser]},
    {path: 'user/saved-jobs', component: SavedJobsComponent, canActivate: [canActivateUser]},
    
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'account-deleted', component: AccountDeletedComponent},
    {path: '**', component:NotFoundComponent}
];

