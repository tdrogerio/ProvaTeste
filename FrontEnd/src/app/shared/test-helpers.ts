import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Common imports for Angular component tests
 * 
 * This module provides a consistent set of imports for component testing,
 * reducing boilerplate and ensuring that all tests have the necessary dependencies.
 * 
 * Basic imports: HttpClient support, animations, forms, and common directives
 */
export const TEST_COMMON_IMPORTS = [
  HttpClientTestingModule,
  NoopAnimationsModule,
  ReactiveFormsModule,
  CommonModule
];

/**
 * Material module imports for component tests
 * 
 * This module includes Angular Material components commonly used in the application.
 * Import this when testing components that use Material design elements.
 */
export const TEST_MATERIAL_IMPORTS = [
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule
];

/**
 * Complete set of test imports
 * 
 * Combines common and Material imports for full testing support
 */
export const TEST_ALL_IMPORTS = [
  ...TEST_COMMON_IMPORTS,
  ...TEST_MATERIAL_IMPORTS
];
