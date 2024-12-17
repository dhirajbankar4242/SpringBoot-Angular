import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { authGuard } from './service/auth.guard';
import { LogInComponent } from './log-in/log-in.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {
        path:'admin',
        component: AdminLayoutComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate:[authGuard]
    },            

    {path: "", component: LogInComponent},
    {path:'error', component:ErrorComponent},
];
