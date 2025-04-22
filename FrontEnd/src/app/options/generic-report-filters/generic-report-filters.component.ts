import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

export interface FilterOption {
  value: string;
  label: string;
}

export interface ReportFilterConfig {
  title: string;
  statusFilter?: {
    label: string;
    options: FilterOption[];
  };
  dateFilter?: {
    enabled: boolean;
    startLabel?: string;
    endLabel?: string;
  };
  additionalFilters?: {
    name: string;
    label: string;
    type: 'select' | 'text';
    options?: FilterOption[];
  }[];
}

@Component({
  selector: 'app-generic-report-filters',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './generic-report-filters.component.html',
  styleUrls: ['./generic-report-filters.component.scss']
})
export class GenericReportFiltersComponent {
  filterForm!: FormGroup;
  config: ReportFilterConfig;

  constructor(
    private dialogRef: MatDialogRef<GenericReportFiltersComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { config: ReportFilterConfig }
  ) {
    this.config = data.config;
    this.initForm();
  }

  private initForm(): void {
    const formGroup: any = {};
    
    if (this.config.statusFilter) {
      formGroup.status = [''];
    }
    
    if (this.config.dateFilter?.enabled) {
      formGroup.startDate = [null];
      formGroup.endDate = [null];
    }

    if (this.config.additionalFilters) {
      this.config.additionalFilters.forEach(filter => {
        formGroup[filter.name] = [''];
      });
    }

    this.filterForm = this.fb.group(formGroup, {
      validators: this.config.dateFilter?.enabled ? this.dateRangeValidator : null
    });
  }

  dateRangeValidator(group: FormGroup) {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    
    if (start && end && new Date(start) > new Date(end)) {
      return { dateRange: true };
    }
    return null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    if (this.filterForm.valid) {
      this.dialogRef.close(this.filterForm.value);
    }
  }
} 