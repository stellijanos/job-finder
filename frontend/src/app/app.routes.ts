import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
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
import { CompanyHomeComponent } from './company/options/company-home/company-home.component';
import { C_AccountDetailsComponent } from './company/options/account-details/account-details.component';
import { C_ChangePasswordComponent } from './company/options/change-password/change-password.component';
import { C_DeleteAccountComponent } from './company/options/delete-account/delete-account.component';
import { C_JobsComponent } from './company/options/jobs/jobs.component';
import { ConcurrencyProblemsComponent } from './concurrency-problems/concurrency-problems.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate: [canActivateAuthRoutes], title: 'Register | JobFinder'},
    {path: 'login', component: LoginComponent, canActivate: [canActivateAuthRoutes], title: 'Login | JobFinder'},
    {path: 'logout', component: LogoutComponent, title:'Logout - JobFinder'},

    {path: 'concurrency-problems', component:ConcurrencyProblemsComponent, title: 'Concurrency Problems'},
    
    
    {path: 'user', component: UserHomeComponent, canActivate: [canActivateUser], title: 'Home - User | Jobfinder'},
    {path: 'user/account-details', component: AccountDetailsComponent, canActivate: [canActivateUser], title:'Account details'},
    {path: 'user/change-password', component: ChangePasswordComponent, canActivate: [canActivateUser], title: 'Change Password'},
    {path: 'user/delete-account', component: DeleteAccountComponent, canActivate: [canActivateUser], title: 'Delete Account'},
    {path: 'user/job-applications', component: JobApplicationsComponent, canActivate: [canActivateUser], title: 'Job Applications'},
    {path: 'user/saved-jobs', component: SavedJobsComponent, canActivate: [canActivateUser], title: 'Saved Jobs'},


    {path: 'company', component: CompanyHomeComponent, canActivate: [canActivateCompany], title:'Home - Company | JobFinder'},
    {path: 'company/jobs', component: C_JobsComponent, canActivate: [canActivateCompany], title: 'Jobs'},
    {path: 'company/applications', component: C_JobsComponent, canActivate: [canActivateCompany], title: ' Applications'},
    {path: 'company/account-details', component: C_AccountDetailsComponent, canActivate: [canActivateCompany], title:'Account details'},
    {path: 'company/change-password', component: C_ChangePasswordComponent, canActivate: [canActivateCompany], title: 'Change Password'},
    {path: 'company/delete-account', component: C_DeleteAccountComponent, canActivate: [canActivateCompany], title: 'Delete Account'},
    // {path: 'company/jobs/create', component: C_JobsComponent, canActivate: [canActivateCompany], title: 'Create Job | JobFinder'},

    {path: 'account-deleted', component: AccountDeletedComponent, title: 'Account deleted'},

    {path: 'unauthorized', component: UnauthorizedComponent, title: 'Unauthorized'},
    {path: '**', component:NotFoundComponent, title: '404 - Not Found'}
];

