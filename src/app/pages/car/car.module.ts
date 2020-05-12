import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import {CarPagesRoutes} from './car.routing';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(CarPagesRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports: [ListComponent, FormComponent, TextMaskModule]
})
export class CarModule { }
