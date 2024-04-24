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
    {path: 'register', component: RegisterComponent, canActivate: [canActivateAuthRoutes], title: 'Register | JobFinder'},
    {path: 'login', component: LoginComponent, canActivate: [canActivateAuthRoutes], title: 'Login | JobFinder'},
    {path: 'logout', component: LogoutComponent, title:'Logout - JobFinder'},
    {path: 'company', component: CompanyComponent, canActivate: [canActivateCompany], title:'Home - Company | JobFinder'},
    
    {path: 'user', component: UserHomeComponent, canActivate: [canActivateUser], title: 'Home - User | Jobfinder'},
    {path: 'user/account-details', component: AccountDetailsComponent, canActivate: [canActivateUser], title:'Account details'},
    {path: 'user/change-password', component: ChangePasswordComponent, canActivate: [canActivateUser], title: 'Change Password'},
    {path: 'user/delete-account', component: DeleteAccountComponent, canActivate: [canActivateUser], title: 'Delete Account'},
    {path: 'user/job-applications', component: JobApplicationsComponent, canActivate: [canActivateUser], title: 'Job Applications'},
    {path: 'user/saved-jobs', component: SavedJobsComponent, canActivate: [canActivateUser], title: 'Saved Jobs'},

    {path: 'account-deleted', component: AccountDeletedComponent, title: 'Account deleted'},

    {path: 'unauthorized', component: UnauthorizedComponent, title: 'Unauthorized'},
    {path: '**', component:NotFoundComponent, title: '404 - Not Found'}
];

