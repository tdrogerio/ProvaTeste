import { Component, Inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfig } from '../../interfaces/modal.interface';

@Component({
  selector: 'app-generic-modals',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './generic-modals.component.html',
  styleUrl: './generic-modals.component.scss'
})
export class GenericModalsComponent {
  template: TemplateRef<any> | null = null;

  constructor(
    public dialogRef: MatDialogRef<GenericModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public config: ModalConfig
  ) {
    this.template = config.template || null;
  }

  fechar(confirmado: boolean = false): void {
    this.dialogRef.close({ confirmado, dados: this.config.dados });
  }
}
