import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

export const CarPagesRoutes: Routes = [
  { path: '', component:  ListComponent},
  { path: 'form', component:  FormComponent},
  { path: 'form/:id', component:  FormComponent}
];
