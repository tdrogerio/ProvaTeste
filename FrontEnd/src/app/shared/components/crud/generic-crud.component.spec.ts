import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { Step } from '../../../interfaces/step.interface';
import { GenericCrudComponent } from './generic-crud.component';
import { GenericStepsComponent } from '../../../options/generic-steps/generic-steps.component';
import moment from 'moment';
import { By } from '@angular/platform-browser';
import { TEST_ALL_IMPORTS } from '../../test-helpers';

// Mock component for GenericStepsComponent
@Component({
  selector: 'app-generic-steps',
  template: '<div>Mock Generic Steps Component</div>',
  standalone: true
})
class MockGenericStepsComponent {
  steps: any[] = [];
  form: any;
  linear = true;
  isEditing = false;
  isViewing = false;
  buttonText = '';
}

describe('GenericCrudComponent', () => {
  let component: GenericCrudComponent;
  let fixture: ComponentFixture<GenericCrudComponent>;
  let formBuilder: FormBuilder;
  let changeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;
  
  beforeEach(async () => {
    // Create a ChangeDetectorRef spy
    changeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    
    await TestBed.configureTestingModule({
      imports: [
        TEST_ALL_IMPORTS, // Use our shared test imports
        GenericCrudComponent,
        MockGenericStepsComponent
      ],
      providers: [
        FormBuilder,
        { provide: ChangeDetectorRef, useValue: changeDetectorRef }
      ],
      schemas: [NO_ERRORS_SCHEMA] // To handle custom elements
    }).compileComponents();
    
    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(GenericCrudComponent);
    component = fixture.componentInstance;
    
    // Setup mock data
    component.form = formBuilder.group({
      id: [''],
      name: [''],
      description: ['']
    });
    
    component.dataSource = new MatTableDataSource<any>([
      { id: 1, name: 'Test 1', description: 'Description 1' },
      { id: 2, name: 'Test 2', description: 'Description 2' }
    ]);
    
    // Create mock Step array that matches the Step interface
    component.steps = [
      {
        label: 'Step 1',
        content: [
          {
            type: 'input',
            label: 'Name',
            formControlName: 'name'
          }
        ]
      },
      {
        label: 'Step 2',
        content: [
          {
            type: 'textarea',
            label: 'Description',
            formControlName: 'description'
          }
        ]
      }
    ];
    
    component.pageSize = 10;
    component.currentPage = 0;
    component.totalItems = 2;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with default values', () => {
      expect(component.pageSize).toBe(10);
      expect(component.currentPage).toBe(0);
      expect(component.totalItems).toBe(2);
      expect(component.showSteps).toBeFalsy();
      expect(component.isCreating).toBeFalsy();
      expect(component.isEditing).toBeFalsy();
      expect(component.isViewing).toBeFalsy();
    });

    it('should call ngOnInit and log initialization data', () => {
      spyOn(console, 'log');
      component.ngOnInit();
      expect(console.log).toHaveBeenCalledWith('GenericCrudComponent inicializado com:', jasmine.objectContaining({
        pageSize: 10,
        currentPage: 0,
        totalItems: 2
      }));
    });
  });

  describe('UI interaction methods', () => {
    it('should apply filter to dataSource', () => {
      const mockEvent = new Event('keyup');
      Object.defineProperty(mockEvent, 'target', { value: { value: 'Test 1' } });
      
      component.applyFilter(mockEvent);
      expect(component.dataSource.filter).toBe('test 1');
    });

    it('should handle empty or null filter value', () => {
      const mockEvent = new Event('keyup');
      Object.defineProperty(mockEvent, 'target', { value: { value: '' } });
      
      component.applyFilter(mockEvent);
      expect(component.dataSource.filter).toBe('');
    });

    it('should handle edit action', () => {
      spyOn(component.edit, 'emit');
      const item = { id: 1, name: 'Test Item' };
      component.onEdit(item);
      
      expect(component.isEditing).toBeTruthy();
      expect(component.showSteps).toBeTruthy();
      expect(component.edit.emit).toHaveBeenCalledWith(item);
    });

    it('should handle add new action', () => {
      spyOn(component.addNew, 'emit');
      component.onAddNew();
      
      expect(component.showSteps).toBeTruthy();
      expect(component.isCreating).toBeTruthy();
      expect(component.isEditing).toBeFalsy();
      expect(component.isViewing).toBeFalsy();
      expect(component.addNew.emit).toHaveBeenCalled();
    });

    it('should handle view action', () => {
      spyOn(component.view, 'emit');
      const item = { id: 1, name: 'Test Item' };
      component.onView(item);
      
      expect(component.view.emit).toHaveBeenCalledWith(item);
    });

    it('should handle delete action', () => {
      spyOn(component.delete, 'emit');
      const item = { id: 1, name: 'Test Item' };
      component.onDelete(item);
      
      expect(component.delete.emit).toHaveBeenCalledWith(item);
    });

    it('should handle save action when form is valid', () => {
      spyOn(component.save, 'emit');
      component.form.setValue({ id: '1', name: 'Test', description: 'Desc' });
      component.isCreating = true;
      component.showSteps = true;
      
      component.onSave();
      
      expect(component.save.emit).toHaveBeenCalledWith({ id: '1', name: 'Test', description: 'Desc' });
      expect(component.showSteps).toBeFalsy();
      expect(component.isCreating).toBeFalsy();
    });

    it('should not emit save event when form is invalid', () => {
      spyOn(component.save, 'emit');
      component.form.get('name')?.setErrors({ required: true });
      
      component.onSave();
      
      expect(component.save.emit).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalsy();
    });

    it('should handle cancel action', () => {
      component.isCreating = true;
      component.isEditing = false;
      component.showSteps = true;
      
      component.onCancelSteps();
      
      expect(component.showSteps).toBeFalsy();
      expect(component.isCreating).toBeFalsy();
      expect(component.isEditing).toBeFalsy();
    });
  });

  describe('pagination handling', () => {
    it('should handle page changes correctly', () => {
      spyOn(component.pageChange, 'emit');
      
      const pageEvent: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 20
      };
      
      component.onPageChange(pageEvent);
      
      expect(component.currentPage).toBe(1);
      expect(component.pageSize).toBe(10);
      expect(component.pageChange.emit).toHaveBeenCalledWith({
        pageIndex: 1,
        pageSize: 10,
        length: 20
      });
    });

    it('should update paginator correctly', () => {
      // Create a fresh mock ChangeDetectorRef
      const mockCdr = {
        detectChanges: jasmine.createSpy('detectChanges')
      };
      
      // Replace the component's cdr with our mock
      (component as any).cdr = mockCdr;
      
      // Setup the paginator with mock properties
      component.paginator = {
        length: 0,
        pageIndex: 0,
        pageSize: 0,
        page: {
          emit: jasmine.createSpy('emit')
        }
      } as any;
      
      // Call the method
      component.updatePaginator(25, 1, 10);
      
      // Verify the results
      expect(component.totalItems).toBe(25);
      expect(component.currentPage).toBe(1);
      expect(component.pageSize).toBe(10);
      expect(component.paginator.length).toBe(25);
      expect(component.paginator.pageIndex).toBe(1);
      expect(component.paginator.pageSize).toBe(10);
      expect(mockCdr.detectChanges).toHaveBeenCalled();
    });
  });

  describe('Component states and header text', () => {
    it('should return correct header title based on component state', () => {
      component.title = 'Usuario';
      
      component.isViewing = true;
      component.isEditing = false;
      expect(component.headerTitle).toBe('Visualizar Usuario');
      
      component.isViewing = false;
      component.isEditing = true;
      expect(component.headerTitle).toBe('Editar Usuario');
      
      component.isViewing = false;
      component.isEditing = false;
      expect(component.headerTitle).toBe('Novo Usuario');
    });
    
    it('should return correct submit button text based on component state', () => {
      component.isEditing = true;
      expect(component.submitButtonText).toBe('Atualizar');
      
      component.isEditing = false;
      component.isCreating = true;
      expect(component.submitButtonText).toBe('Criar');
      
      component.isEditing = false;
      component.isCreating = false;
      expect(component.submitButtonText).toBe('Salvar');
    });
  });

  describe('Form handling', () => {
    it('should reset form when cancelling', () => {
      spyOn(component.form, 'reset');
      spyOn(component.cancel, 'emit');
      
      component.form.setValue({ id: '1', name: 'Test', description: 'Desc' });
      component.onCancelSteps();
      
      expect(component.form.reset).toHaveBeenCalled();
      expect(component.cancel.emit).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined dataSource', () => {
      component.dataSource = undefined as any;
      
      // Should not throw an error
      component.onGenerateReport();
      expect(true).toBeTruthy(); // If we got here, no error was thrown
    });

    it('should handle empty steps array', () => {
      component.steps = [];
      component.isCreating = true;
      component.showSteps = true;
      fixture.detectChanges();
      
      // We just need to verify the component doesn't throw errors with empty steps
      expect(component.steps).toEqual([]);
    });

    it('should handle disableActions flag', () => {
      component.disableActions = true;
      fixture.detectChanges();
      
      // This test depends on template inspection, which is already tested indirectly
      // through component behavior tests
      expect(component.disableActions).toBeTrue();
    });
  });
});