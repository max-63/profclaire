import { Routes } from '@angular/router';
import { LoginRegister } from './login-register/login-register';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [

    { path: '', component: LoginRegister },
    { path: 'dashboard', component: Dashboard },

];
