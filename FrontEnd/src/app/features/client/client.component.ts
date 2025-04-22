import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericCrudComponent } from '../../shared/components/crud/generic-crud.component';
import { Step } from '../../interfaces/step.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { NotificationService } from '../../services/notification.service';
import { ClientService, PaginatedResponse } from '../../services/client.service';
import { client, ClientType } from '../../models/client.model';
import { finalize, tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

// Classe para internacionalização do paginador
class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    GenericCrudComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonModule,
    MatSortModule,
    LoadingComponent
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class ClientComponent implements OnInit, AfterViewInit {
  @ViewChild(GenericCrudComponent) genericCrud!: GenericCrudComponent;
  
  public dataSource = new MatTableDataSource<client>([]);
  public editForm: FormGroup;
  public form: FormGroup;
  steps: Step[] = [];
  showSteps = false;
  title = 'Clientes';
  public displayedColumns: string[] = ['id', 'name', 'document', 'clientType', 'phone', 'email', 'actions'];
  
  // Variáveis para controlar a paginação
  pageSize = 10;
  currentPage = 0;
  allData: client[] = [];
  
  // Variável para controlar a visualização de dados paginados
  paginatedData: client[] = [];

  isLoading = false;
  isEditing = false;
  isViewing = false;
  isCreating = false;
  totalItems = 0;
  editingItem: client | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private clientService: ClientService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.createForm();
    this.form = this.createForm();
    this.setupSteps();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      document: ['', Validators.required],
      clientType: [ClientType.Individual, Validators.required],
      birthDate: [''],
      ie: [''],
      ieExempt: [false],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        cep: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        complement: ['']
      })
    });
  }

  ngOnInit(): void {
    console.log('Componente inicializado');
    this.loadClients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      if (this.genericCrud) {
        this.genericCrud.updatePaginator(
          this.allData.length, 
          this.currentPage, 
          this.pageSize
        );
      }
    });
  }

  applyPagination(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    this.paginatedData = this.allData.slice(startIndex, endIndex);
    this.dataSource.data = this.paginatedData;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadClients(event.pageIndex + 1, event.pageSize);
  }

  loadClients(page: number = 0, pageSize: number = 10, search: string = ''): void {
    const apiPage = page + 1;
    
    this.isLoading = true;
    this.clientService.listarClientes(apiPage, pageSize, search).subscribe({
      next: (response: PaginatedResponse<client>) => {
        this.allData = response.Items.$values;
        this.applyPagination();
        
        if (this.genericCrud) {
          this.genericCrud.updatePaginator(
            response.Total,
            this.currentPage,
            this.pageSize
          );
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar clientes:', error);
        this.notificationService.error('Erro ao carregar clientes');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  setupSteps(): void {
    this.steps = [
      {
        label: 'Informações do Cliente',
        content: [
          { type: 'input', label: 'Nome', formControlName: 'name', appearance: 'outline' },
          { type: 'input', label: 'Documento', formControlName: 'document', appearance: 'outline' },
          { 
            type: 'select', 
            label: 'Tipo de Cliente', 
            formControlName: 'clientType', 
            appearance: 'outline',
            options: [
              { value: ClientType.Individual, label: 'Pessoa Física' },
              { value: ClientType.Business, label: 'Pessoa Jurídica' }
            ]
          },
          { type: 'input', label: 'Telefone', formControlName: 'phone', appearance: 'outline' },
          { type: 'input', label: 'Email', formControlName: 'email', appearance: 'outline' },
          { type: 'input', label: 'CEP', formControlName: 'address.cep', appearance: 'outline' },
          { type: 'input', label: 'Rua', formControlName: 'address.street', appearance: 'outline' },
          { type: 'input', label: 'Número', formControlName: 'address.number', appearance: 'outline' },
          { type: 'input', label: 'Bairro', formControlName: 'address.neighborhood', appearance: 'outline' },
          { type: 'input', label: 'Cidade', formControlName: 'address.city', appearance: 'outline' },
          { type: 'input', label: 'Estado', formControlName: 'address.state', appearance: 'outline' },
          { type: 'input', label: 'Complemento', formControlName: 'address.complement', appearance: 'outline' }
        ]
      }
    ];
  }

  onAddNew(): void {
    this.isCreating = true;
    this.isEditing = false;
    this.isViewing = false;
    this.showSteps = true;

    this.editForm.reset();
    this.editForm.patchValue({
      clientType: ClientType.Individual
    });

    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key);
      if (control) {
        control.markAsDirty();
        control.markAsTouched();
        control.enable();
      }
    });

    this.setupSteps();
    this.cdr.detectChanges();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.editForm.valid) {
      const formData = this.editForm.getRawValue();
      
      if (this.isEditing) {
        const submitButton = event.target as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = true;
        }
        
        this.clientService.update(formData.id, formData).subscribe({
          next: (response: client) => {
            this.isEditing = false;
            this.showSteps = false;
            this.loadClients();
            this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error: (error: Error) => {
            console.error('Erro ao atualizar cliente:', error);
            this.snackBar.open('Erro ao atualizar cliente. Tente novamente.', 'Fechar', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          complete: () => {
            if (submitButton) {
              submitButton.disabled = false;
            }
          }
        });
      } else if (this.isCreating) {
        const submitButton = event.target as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = true;
        }
        
        this.clientService.create(formData).subscribe({
          next: (response: client) => {
            this.isCreating = false;
            this.showSteps = false;
            this.loadClients();
            this.snackBar.open('Cliente criado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error: (error: Error) => {
            console.error('Erro ao criar cliente:', error);
            this.snackBar.open('Erro ao criar cliente. Tente novamente.', 'Fechar', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          complete: () => {
            if (submitButton) {
              submitButton.disabled = false;
            }
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.editForm);
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
  }

  onEdit(client: client): void {
    this.isEditing = true;
    this.isViewing = false;
    this.isCreating = false;
    this.showSteps = true;
    this.editingItem = client;
    
    this.editForm.reset();
    this.editForm.patchValue(client);
    
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.get(key)?.enable();
    });
    
    this.setupSteps();
    this.cdr.detectChanges();
  }

  onView(client: client): void {
    this.isViewing = true;
    this.isEditing = false;
    this.isCreating = false;
    this.showSteps = true;

    this.editForm.patchValue(client);
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.get(key)?.disable();
    });

    this.setupSteps();
    this.cdr.detectChanges();
  }

  onDelete(id: string): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.isLoading = true;
      this.clientService.delete(id).subscribe({
        next: () => {
          this.notificationService.success('Cliente excluído com sucesso!');
          this.loadClients(this.currentPage, this.pageSize);
        },
        error: (error) => {
          console.error('Erro ao excluir cliente:', error);
          this.notificationService.error('Erro ao excluir cliente');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.isEditing = false;
    this.isViewing = false;
    this.isCreating = false;
    this.showSteps = false;
    this.editingItem = null;
    this.editForm.reset();
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.get(key)?.enable();
    });
  }

  public isFieldInvalid(fieldName: string): boolean {
    const field = this.editForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  public getErrorMessage(fieldName: string): string {
    const field = this.editForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Campo obrigatório';
      if (field.errors['email']) return 'Email inválido';
    }
    return '';
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    });
  }
} 