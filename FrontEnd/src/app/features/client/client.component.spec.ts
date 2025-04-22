import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientComponent } from './client.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';
import { ClientService, PaginatedResponse } from '../../services/client.service';
import { client, ClientType } from '../../models/client.model';
import { ChangeDetectorRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let clientService: jasmine.SpyObj<ClientService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let cdr: jasmine.SpyObj<ChangeDetectorRef>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;
  
  const mockClients: client[] = [
    {
      id: '1',
      name: 'Cliente Teste 1',
      document: '123.456.789-00',
      clientType: ClientType.Individual,
      birthDate: '1990-01-01',
      phone: '(11) 99999-9999',
      email: 'cliente1@teste.com',
      address: {
        cep: '12345-678',
        street: 'Rua Teste 1',
        number: '123',
        neighborhood: 'Bairro Teste 1',
        city: 'Cidade Teste 1',
        state: 'SP',
        complement: 'Complemento 1'
      }
    },
    {
      id: '2',
      name: 'Cliente Teste 2',
      document: '12.345.678/0001-90',
      clientType: ClientType.Business,
      ie: '123.456.789.123',
      ieExempt: false,
      phone: '(11) 88888-8888',
      email: 'cliente2@teste.com',
      address: {
        cep: '87654-321',
        street: 'Rua Teste 2',
        number: '456',
        neighborhood: 'Bairro Teste 2',
        city: 'Cidade Teste 2',
        state: 'RJ',
        complement: 'Complemento 2'
      }
    }
  ];

  beforeEach(async () => {
    const clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'listarClientes',
      'create',
      'update',
      'delete',
      'visualizar'
    ]);
    
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'success',
      'error',
      'warning'
    ]);
    
    const cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    
    const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    
    await TestBed.configureTestingModule({
      imports: [
        ClientComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        FormBuilder,
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    clientService = TestBed.inject(ClientService) as jasmine.SpyObj<ClientService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    cdr = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
    matSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    
    clientService.listarClientes.and.returnValue(of({
      $id: '1',
      Items: {
        $id: '2',
        $values: mockClients
      },
      Total: mockClients.length,
      Page: 1,
      PageSize: 10
    } as PaginatedResponse<client>));

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    
    component.genericCrud = jasmine.createSpyObj('GenericCrudComponent', [
      'updatePaginator',
      'generateExcelReport'
    ]);
    
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on init', () => {
    expect(clientService.listarClientes).toHaveBeenCalled();
    expect(component.allData.length).toBe(mockClients.length);
  });

  it('should update pagination when page changes', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    
    const pageEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 20,
      length: 100
    };

    clientService.listarClientes.calls.reset();
    
    component.onPageChange(pageEvent);
    tick();

    expect(component.currentPage).toBe(2);
    expect(component.pageSize).toBe(20);
    expect(clientService.listarClientes).toHaveBeenCalledWith(4, 20, '');
  }));

  it('should open form for creating a new client', () => {
    component.onAddNew();
    
    expect(component.isCreating).toBeTrue();
    expect(component.isEditing).toBeFalse();
    expect(component.isViewing).toBeFalse();
    expect(component.showSteps).toBeTrue();
    
    expect(component.editForm.value.name).toBe('');
    expect(component.editForm.value.document).toBe('');
    expect(component.editForm.value.clientType).toBe(ClientType.Individual);
  });

  it('should open form for editing a client', () => {
    const clientToEdit = mockClients[0];
    
    component.onEdit(clientToEdit);
    
    expect(component.isEditing).toBeTrue();
    expect(component.isCreating).toBeFalse();
    expect(component.isViewing).toBeFalse();
    expect(component.showSteps).toBeTrue();
    expect(component.editingItem).toBe(clientToEdit);
    
    expect(component.editForm.value.id).toBe(clientToEdit.id);
    expect(component.editForm.value.name).toBe(clientToEdit.name);
    expect(component.editForm.value.document).toBe(clientToEdit.document);
  });

  it('should view client details', () => {
    const clientToView = mockClients[0];
    
    component.onView(clientToView);
    
    expect(component.isViewing).toBeTrue();
    expect(component.isEditing).toBeFalse();
    expect(component.isCreating).toBeFalse();
    expect(component.showSteps).toBeTrue();
    
    expect(component.editForm.value.id).toBe(clientToView.id);
    expect(component.editForm.value.name).toBe(clientToView.name);
    expect(component.editForm.value.document).toBe(clientToView.document);
    
    const allDisabled = Object.keys(component.editForm.controls).every(
      key => component.editForm.get(key)?.disabled
    );
    expect(allDisabled).toBeTrue();
  });

  it('should delete a client with confirmation', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    clientService.delete.and.returnValue(of(void 0));
    
    component.onDelete('1');
    tick();
    
    expect(window.confirm).toHaveBeenCalledWith('Tem certeza que deseja excluir este cliente?');
    expect(clientService.delete).toHaveBeenCalledWith('1');
    expect(notificationService.success).toHaveBeenCalledWith('Cliente excluído com sucesso!');
  }));

  it('should not delete a client without confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.onDelete('1');
    
    expect(window.confirm).toHaveBeenCalledWith('Tem certeza que deseja excluir este cliente?');
    expect(clientService.delete).not.toHaveBeenCalled();
  });

  it('should handle error when loading clients', () => {
    const errorMessage = 'Erro ao carregar';
    clientService.listarClientes.and.returnValue(throwError(() => new Error(errorMessage)));
    
    spyOn(console, 'error');
    
    component.loadClients();
    
    expect(console.error).toHaveBeenCalled();
    expect(notificationService.error).toHaveBeenCalledWith('Erro ao carregar clientes');
  });

  it('should create a new client', fakeAsync(() => {
    const newClient = {
      id: '',
      name: 'Novo Cliente',
      document: '987.654.321-00',
      clientType: ClientType.Individual,
      birthDate: '1995-01-01',
      phone: '(11) 77777-7777',
      email: 'novo@cliente.com',
      address: {
        cep: '54321-876',
        street: 'Rua Nova',
        number: '789',
        neighborhood: 'Bairro Novo',
        city: 'Cidade Nova',
        state: 'SP',
        complement: 'Complemento Novo'
      }
    };
    
    component.onAddNew();
    component.editForm.patchValue(newClient);
    
    clientService.create.and.returnValue(of({
      ...newClient,
      id: '3'
    }));
    
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault', 'target']);
    mockEvent.target = jasmine.createSpyObj('HTMLButtonElement', ['disabled']);
    
    component.onSubmit(mockEvent);
    tick();
    
    expect(clientService.create).toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith('Cliente criado com sucesso!', 'Fechar', jasmine.any(Object));
  }));

  it('should update an existing client', fakeAsync(() => {
    const clientToEdit = mockClients[0];
    const updatedClient = {
      ...clientToEdit,
      name: 'Cliente Atualizado',
      phone: '(11) 66666-6666'
    };
    
    component.onEdit(clientToEdit);
    component.editForm.patchValue({
      name: 'Cliente Atualizado',
      phone: '(11) 66666-6666'
    });
    
    clientService.update.and.returnValue(of(updatedClient));
    
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault', 'target']);
    mockEvent.target = jasmine.createSpyObj('HTMLButtonElement', ['disabled']);
    
    component.onSubmit(mockEvent);
    tick();
    
    expect(clientService.update).toHaveBeenCalledWith(clientToEdit.id, jasmine.objectContaining({
      id: clientToEdit.id,
      name: 'Cliente Atualizado',
      phone: '(11) 66666-6666'
    }));
    expect(matSnackBar.open).toHaveBeenCalledWith('Cliente atualizado com sucesso!', 'Fechar', jasmine.any(Object));
  }));

  it('should validate form before submission', () => {
    component.onAddNew();
    component.editForm.patchValue({
      name: ''
    });
    
    const mockEvent = jasmine.createSpyObj('Event', ['preventDefault', 'target']);
    
    component.onSubmit(mockEvent);
    
    expect(clientService.create).not.toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith('Por favor, preencha todos os campos obrigatórios.', 'Fechar', jasmine.any(Object));
  });

  it('should cancel editing', () => {
    component.onEdit(mockClients[0]);
    component.onCancel();
    
    expect(component.isEditing).toBeFalse();
    expect(component.isViewing).toBeFalse();
    expect(component.isCreating).toBeFalse();
    expect(component.showSteps).toBeFalse();
    expect(component.editingItem).toBeNull();
  });

  it('should detect field validity', () => {
    component.onAddNew();
    
    component.editForm.get('name')?.markAsTouched();
    
    component.editForm.get('name')?.setValue('');
    expect(component.isFieldInvalid('name')).toBeTrue();
    
    component.editForm.get('name')?.setValue('Cliente Teste');
    expect(component.isFieldInvalid('name')).toBeFalse();
  });

  it('should return appropriate error messages', () => {
    component.onAddNew();
    
    component.editForm.get('name')?.setErrors({ required: true });
    expect(component.getErrorMessage('name')).toBe('Campo obrigatório');
    
    component.editForm.get('email')?.setErrors({ email: true });
    expect(component.getErrorMessage('email')).toBe('Email inválido');
  });
}); 