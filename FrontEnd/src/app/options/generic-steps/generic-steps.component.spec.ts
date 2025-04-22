import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericStepsComponent } from './generic-steps.component';

describe('GenericStepsComponent', () => {
  let component: GenericStepsComponent;
  let fixture: ComponentFixture<GenericStepsComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GenericStepsComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(GenericStepsComponent);
    component = fixture.componentInstance;
    
    // Initialize required inputs
    component.form = formBuilder.group({
      // Add any form controls needed for testing
      testField: ['']
    });
    
    component.steps = [
      {
        label: 'Test Step',
        content: [
          {
            type: 'input',
            label: 'Test Field',
            formControlName: 'testField',
            inputType: 'text'
          }
        ]
      }
    ];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
