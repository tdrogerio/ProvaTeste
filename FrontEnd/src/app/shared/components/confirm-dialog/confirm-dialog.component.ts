import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatDialogModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Confirmação' }}</h2>
    <div mat-dialog-content>
      <p *ngIf="data.message">{{ data.message }}</p>
      
      <div *ngIf="data.showInput">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ data.inputLabel || 'Informação adicional' }}</mat-label>
          
          <!-- Input de texto normal -->
          <input matInput *ngIf="!data.inputType || data.inputType === 'text'" 
                 [(ngModel)]="inputValue" 
                 [placeholder]="data.inputPlaceholder || ''" 
                 [required]="true">
          
          <!-- Input de texto multi-linha -->
          <textarea matInput *ngIf="data.inputType === 'textarea'" 
                    [(ngModel)]="inputValue" 
                    [placeholder]="data.inputPlaceholder || ''" 
                    rows="4"
                    [required]="true"></textarea>
          
          <!-- Input do tipo select -->
          <mat-select *ngIf="data.inputType === 'select'" 
                      [(ngModel)]="inputValue" 
                      [required]="true">
            <mat-option *ngFor="let option of data.inputOptions" [value]="option.value">
              {{ option.label }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      
      <!-- Campo de entrada adicional, geralmente para observações -->
      <div *ngIf="data.extraInput">
        <mat-form-field appearance="outline" class="full-width mt-10">
          <mat-label>{{ data.extraInput.label || 'Observação' }}</mat-label>
          
          <!-- Input de texto normal -->
          <input matInput *ngIf="!data.extraInput.type || data.extraInput.type === 'text'" 
                 [(ngModel)]="extraInputValue" 
                 [placeholder]="data.extraInput.placeholder || ''" 
                 [required]="data.extraInput.required || false">
          
          <!-- Input de texto multi-linha -->
          <textarea matInput *ngIf="data.extraInput.type === 'textarea'" 
                    [(ngModel)]="extraInputValue" 
                    [placeholder]="data.extraInput.placeholder || ''" 
                    rows="4"
                    [required]="data.extraInput.required || false"></textarea>
          
          <!-- Input do tipo select -->
          <mat-select *ngIf="data.extraInput.type === 'select'" 
                      [(ngModel)]="extraInputValue" 
                      [required]="data.extraInput.required || false">
            <mat-option *ngFor="let option of data.extraInput.options" [value]="option.value">
              {{ option.label }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </div>
    
    <div mat-dialog-actions align="end">
      <button mat-button *ngIf="data.showCancelButton" 
              [mat-dialog-close]="false" 
              [color]="data.cancelButtonColor || ''">
        {{ data.cancelButtonText || 'Cancelar' }}
      </button>
      
      <button mat-raised-button 
              [color]="data.confirmButtonColor || 'primary'" 
              [disabled]="(data.showInput && !inputValue) || (data.extraInput && data.extraInput.required && !extraInputValue)"
              (click)="onConfirm()">
        {{ data.confirmButtonText || 'Confirmar' }}
      </button>
    </div>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
    
    .mt-10 {
      margin-top: 10px;
    }
  `]
})
export class ConfirmDialogComponent {
  inputValue: string = '';
  extraInputValue: string = '';
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title?: string;
      message?: string;
      confirmButtonText?: string;
      confirmButtonColor?: string;
      showCancelButton?: boolean;
      cancelButtonText?: string;
      cancelButtonColor?: string;
      showInput?: boolean;
      inputLabel?: string;
      inputPlaceholder?: string;
      inputType?: 'text' | 'textarea' | 'select';
      inputValue?: string;
      inputOptions?: { value: string, label: string }[];
      extraInput?: {
        label?: string;
        type?: 'text' | 'textarea' | 'select';
        placeholder?: string;
        value?: string;
        options?: { value: string, label: string }[];
        required?: boolean;
      }
    }
  ) {
    if (data.inputValue) {
      this.inputValue = data.inputValue;
    }
    
    if (data.extraInput && data.extraInput.value) {
      this.extraInputValue = data.extraInput.value;
    }
  }
  
  onConfirm(): void {
    if (this.data.extraInput) {
      // Se há campo extra, retornamos ambos os valores
      this.dialogRef.close({ 
        value: this.inputValue,
        extraValue: this.extraInputValue
      });
    } else {
      // Caso contrário, retornamos apenas o valor principal
      this.dialogRef.close({ value: this.inputValue });
    }
  }
} 