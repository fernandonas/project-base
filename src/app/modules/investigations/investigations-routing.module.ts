import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestigationsComponent } from './investigations.component';

const routes: Routes = [
  {
    path: '',
    component: InvestigationsComponent
  },
  {
    path: ':uuid',
    loadChildren: () => import('../investigation/investigation.module').then(m => m.InvestigationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationsRoutingModule { }
