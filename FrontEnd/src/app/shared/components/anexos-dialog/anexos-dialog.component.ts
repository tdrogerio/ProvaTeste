import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ContractAttachment } from '../../../models/contract.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContractService } from '../../../services/contract.service';

@Component({
  selector: 'app-anexos-dialog',
  standalone: true,
  templateUrl: './anexos-dialog.component.html',
  styleUrls: ['./anexos-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class AnexosDialogComponent {
  displayedColumns: string[] = ['nome', 'dataCriacao', 'actions'];
  dataSource: ContractAttachment[] = [];
  isSaving = false;
  deletedAnexos: ContractAttachment[] = [];
  newAnexos: ContractAttachment[] = [];

  constructor(
    public dialogRef: MatDialogRef<AnexosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { anexos: ContractAttachment[], contratoId: number, contrato: any },
    private contractService: ContractService
  ) {
    this.dataSource = [...this.data.anexos];
  }

  getFileName(url: string): string {
    if (!url) return 'Nome não disponível';
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  onDeleteAnexo(anexo: ContractAttachment): void {
    if (confirm('Tem certeza que deseja excluir este anexo?')) {
      //const index = this.dataSource.findIndex(a => a.anexoId === anexo.anexoId);
      //if (index !== -1) {
        //this.dataSource.splice(index, 1);
        this.deletedAnexos.push(anexo);
      //}
    }
  }


  onClose(): void {
    this.dialogRef.close();
  }
}
