import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormConfig } from '../../interfaces/form.interface';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {
  @Input() config!: FormConfig;
  @Input() initialData: any = null;
  @Input() isViewing: boolean = false;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }

    if (this.isViewing) {
      this.form.disable();
    }
  }

  private initForm() {
    const group: any = {};
    
    this.config.fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      if (field.validators) {
        validators.push(...field.validators);
      }
      
      group[field.name] = ['', validators];
    });

    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
} 