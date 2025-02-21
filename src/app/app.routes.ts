import { Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
    }
];
