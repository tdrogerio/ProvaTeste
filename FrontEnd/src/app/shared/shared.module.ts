import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericTabsComponent } from '../options/generic-tabs/generic-tabs.component';
import { GenericStepsComponent } from '../options/generic-steps/generic-steps.component';
import { GenericModalsComponent } from '../options/generic-modals/generic-modals.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    GenericTabsComponent,
    GenericStepsComponent,
    GenericModalsComponent
  ],
  exports: [
    MaterialModule,
    GenericTabsComponent,
    GenericStepsComponent,
    GenericModalsComponent
  ]
})
export class SharedModule {}
