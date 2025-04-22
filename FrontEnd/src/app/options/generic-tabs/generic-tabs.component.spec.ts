import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericTabsComponent } from './generic-tabs.component';

describe('GenericTabsComponent', () => {
  let component: GenericTabsComponent;
  let fixture: ComponentFixture<GenericTabsComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GenericTabsComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(GenericTabsComponent);
    component = fixture.componentInstance;
    
    // Initialize required inputs
    component.form = formBuilder.group({
      testField: ['']
    });
    
    component.tabs = [
      {
        label: 'Test Tab',
        content: [
          {
            type: 'input',
            label: 'Test Field',
            formControlName: 'testField'
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
