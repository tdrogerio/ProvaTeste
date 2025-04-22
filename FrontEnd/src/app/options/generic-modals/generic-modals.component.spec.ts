import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericModalsComponent } from './generic-modals.component';
import { ModalConfig } from '../../interfaces/modal.interface';

describe('GenericModalsComponent', () => {
  let component: GenericModalsComponent;
  let fixture: ComponentFixture<GenericModalsComponent>;
  
  // Create mock objects
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  
  const mockModalConfig: ModalConfig = {
    titulo: 'Test Modal',
    largura: '400px',
    dados: {
      mensagem: 'Test Message',
      botoes: [
        { texto: 'Confirmar', cor: 'primary' },
        { texto: 'Cancelar', cor: 'warn' }
      ]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GenericModalsComponent,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockModalConfig }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should close dialog when fechar is called', () => {
    component.fechar();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
