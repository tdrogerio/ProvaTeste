import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
  
  const mockDialogData = {
    message: 'Test confirm message'
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ConfirmDialogComponent,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: dialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided message', () => {
    const dialogContent = fixture.debugElement.query(By.css('mat-dialog-content'));
    expect(dialogContent.nativeElement.textContent).toBe(mockDialogData.message);
  });

  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).toBe('Confirmação');
  });

  it('should have "Não" and "Sim" buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
    
    expect(buttons[0].nativeElement.textContent).toContain('Não');
    expect(buttons[1].nativeElement.textContent).toContain('Sim');
  });

  it('should close with false when "Não" is clicked', () => {
    const noButton = fixture.debugElement.queryAll(By.css('button'))[0];
    noButton.nativeElement.click();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close with true when "Sim" is clicked', () => {
    const yesButton = fixture.debugElement.queryAll(By.css('button'))[1];
    yesButton.nativeElement.click();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
