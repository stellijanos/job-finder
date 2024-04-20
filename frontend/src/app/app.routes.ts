import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { canActivateUser } from './guards/user.guard';
import { canActivateCompany } from './guards/company.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'company', component: CompanyComponent, canActivate: [canActivateCompany]},
    {path: 'user', component: UserComponent, canActivate: [canActivateUser]},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: '**', component:NotFoundComponent}
];
