import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="error-dialog">
      <mat-icon *ngIf="!data.success" class="error-icon error">error</mat-icon>
      <mat-icon *ngIf="data.success" class="error-icon success">check_circle</mat-icon>
      <h2>{{ data.title || (data.success ? 'Sucesso' : 'Erro') }}</h2>
      <p>{{ data.message }}</p>
      <div *ngIf="data.html" [innerHTML]="data.html" class="html-content"></div>
      <div class="dialog-actions">
        <button mat-raised-button [color]="data.success ? 'primary' : 'warn'" (click)="close()">{{ data.buttonText || 'Fechar' }}</button>
      </div>
    </div>
  `,
  styles: [`
    .error-dialog {
      padding: 20px;
      text-align: center;
    }
    .error-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
    }
    .error-icon.error {
      color: #f44336;
    }
    .error-icon.success {
      color: #4caf50;
    }
    h2 {
      margin-top: 0;
    }
    h2.error {
      color: #f44336;
    }
    h2.success {
      color: #4caf50;
    }
    .dialog-actions {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    .html-content {
      margin: 20px 0;
      text-align: left;
      max-height: 400px;
      overflow-y: auto;
    }
    .html-content table {
      width: 100%;
      border-collapse: collapse;
    }
    .html-content th, .html-content td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .html-content th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    .html-content tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  `]
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      message: string;
      title?: string;
      html?: string;
      success?: boolean;
      buttonText?: string;
    }
  ) {
    // Definir valores padrão
    this.data.success = this.data.success || false;
  }

  close(): void {
    this.dialogRef.close();
  }
} 