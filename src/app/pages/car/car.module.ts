import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';

import {CarPagesRoutes} from './car.routing';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(CarPagesRoutes),
    SharedModule
  ],
  exports: [ListComponent, FormComponent]
})
export class CarModule { }
