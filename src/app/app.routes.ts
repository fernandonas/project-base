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
        path: 'investigations',
        loadChildren: () => import('./modules/investigations/investigations.module').then((m) => m.InvestigationsModule)
    }
];
