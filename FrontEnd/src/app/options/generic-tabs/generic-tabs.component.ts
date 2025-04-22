import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tab } from '../../interfaces/tab.interface';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-generic-tabs',
  templateUrl: './generic-tabs.component.html',
  styleUrls: ['./generic-tabs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ]
})
export class GenericTabsComponent {
  @Input() tabs: Tab[] = [];
  @Input() form!: FormGroup;
}