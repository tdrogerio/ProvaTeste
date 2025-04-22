import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ContentChildren,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';
import { MatTableDataSource, MatColumnDef, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { Step } from '../../../interfaces/step.interface';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericStepsComponent } from '../../../options/generic-steps/generic-steps.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generic-crud',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    GenericStepsComponent,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.scss']
})
export class GenericCrudComponent implements OnInit, AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() dataSource!: MatTableDataSource<any>;
  @Input() form!: FormGroup;
  @Input() steps: Step[] = [];
  @Input() showSteps = false;
  @Input() title = '';
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() disableActions = false;
  @Input() enableCreate = true;
  @Input() isCreating = false;
  @Input() isEditing = false;
  @Input() isViewing = false;
  @Input() editingItem: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() edit = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() generateReport = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() addNew = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('GenericCrudComponent inicializado com:', {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      // Não atribuir o dataSource.paginator aqui para evitar conflitos
      // this.dataSource.paginator = this.paginator;
      
      // Configurar o paginator com os valores iniciais
      this.paginator.pageIndex = this.currentPage;
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.totalItems;
      
      console.log('Paginator do GenericCrudComponent inicializado:', {
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
      
      this.cdr.detectChanges();
    } else {
      console.error('Paginator do GenericCrudComponent não foi inicializado corretamente.');
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  onEdit(item: any): void {
    this.isEditing = true;
    this.showSteps = true;
    this.edit.emit(item);
  }

  onAddNew(): void {
    this.showSteps = true;
    this.isCreating = true;
    this.isEditing = false;
    this.isViewing = false;
    this.addNew.emit();
  }

  onView(item: any): void {
    this.view.emit(item);
  }

  onDelete(item: any): void {
    this.delete.emit(item);
  }

  onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.showSteps = false;
      this.isCreating = false;
      this.isEditing = false;
      this.isViewing = false;
    }
  }

  onCancelSteps(): void {
    this.showSteps = false;
    this.isCreating = false;
    this.isEditing = false;
    this.isViewing = false;
    this.form.reset();
    this.cancel.emit();
  }

  onGenerateReport(): void {
    this.generateReport.emit();
  }

  onPageChange(event: PageEvent): void {
    console.log('Evento de paginação no GenericCrudComponent:', event);
    
    // Atualizar os valores locais
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    
    // Emitir o evento para o componente pai
    this.pageChange.emit(event);
  }

  generateExcelReport(data: any[], config: {
    fileName: string;
    sheetName: string;
    columns: {
      field: string;
      header: string;
      width: number;
      format?: (value: any) => any;
    }[];
  }): void {
    const reportData = data.map(item => {
      const formattedItem: any = {};
      config.columns.forEach(col => {
        formattedItem[col.header] = col.format
          ? col.format(item[col.field])
          : item[col.field];
      });
      return formattedItem;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(reportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, config.sheetName);
    ws['!cols'] = config.columns.map(col => ({ wch: col.width }));
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blobData: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const fileName = `${config.fileName}_${moment().format('DD-MM-YYYY')}.xlsx`;
    saveAs(blobData, fileName);
  }

  get headerTitle(): string {
    if (this.isViewing) return `Visualizar ${this.title}`;
    if (this.isEditing) return `Editar ${this.title}`;
    return `Novo ${this.title}`;
  }

  get submitButtonText(): string {
    if (this.isEditing) return 'Atualizar';
    if (this.isCreating) return 'Criar';
    return 'Salvar';
  }

  // Método para atualizar o paginator
  updatePaginator(totalItems: number, currentPage: number, pageSize: number): void {
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    
    if (this.paginator) {
      this.paginator.length = totalItems;
      this.paginator.pageIndex = currentPage;
      this.paginator.pageSize = pageSize;
      
      this.cdr.detectChanges();
    }
  }
}
