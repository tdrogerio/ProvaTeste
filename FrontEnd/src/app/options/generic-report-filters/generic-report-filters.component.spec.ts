import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericReportFiltersComponent, ReportFilterConfig } from './generic-report-filters.component';

describe('GenericReportFiltersComponent', () => {
  let component: GenericReportFiltersComponent;
  let fixture: ComponentFixture<GenericReportFiltersComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<GenericReportFiltersComponent>>;

  const mockConfig: ReportFilterConfig = {
    title: 'Test Report',
    statusFilter: {
      label: 'Status',
      options: [
        { value: 'active', label: 'Ativo' },
        { value: 'inactive', label: 'Inativo' }
      ]
    },
    dateFilter: {
      enabled: true,
      startLabel: 'Data Inicial',
      endLabel: 'Data Final'
    }
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        GenericReportFiltersComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { config: mockConfig } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericReportFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct controls', () => {
    expect(component.filterForm.get('status')).toBeTruthy();
    expect(component.filterForm.get('startDate')).toBeTruthy();
    expect(component.filterForm.get('endDate')).toBeTruthy();
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with form values on apply when form is valid', () => {
    const testValues = {
      status: 'active',
      startDate: new Date(),
      endDate: new Date()
    };

    component.filterForm.patchValue(testValues);
    component.onApply();

    expect(dialogRef.close).toHaveBeenCalledWith(testValues);
  });

  it('should validate date range correctly', () => {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2023, 11, 31);

    component.filterForm.patchValue({
      startDate,
      endDate
    });

    expect(component.filterForm.errors?.['dateRange']).toBeTruthy();
  });

  it('should render all filter fields based on config', () => {
    const compiled = fixture.nativeElement;
    
    // Verifica título
    expect(compiled.querySelector('h2').textContent).toContain(mockConfig.title);
    
    // Verifica campo de status
    expect(compiled.querySelector('mat-select')).toBeTruthy();
    
    // Verifica campos de data
    expect(compiled.querySelector('mat-date-range-input')).toBeTruthy();
  });

  it('should handle additional filters when provided', () => {
    const configWithAdditionalFilters: ReportFilterConfig = {
      ...mockConfig,
      additionalFilters: [
        {
          name: 'type',
          label: 'Tipo',
          type: 'select',
          options: [
            { value: 'type1', label: 'Tipo 1' },
            { value: 'type2', label: 'Tipo 2' }
          ]
        }
      ]
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        GenericReportFiltersComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { config: configWithAdditionalFilters } }
      ]
    });

    const newFixture = TestBed.createComponent(GenericReportFiltersComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.filterForm.get('type')).toBeTruthy();
  });
}); 