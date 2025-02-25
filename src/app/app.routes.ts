import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule)
    },
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
