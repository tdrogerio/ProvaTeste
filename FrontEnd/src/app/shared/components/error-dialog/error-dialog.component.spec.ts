import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDialogComponent } from './error-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TEST_ALL_IMPORTS } from '../../test-helpers';

describe('ErrorDialogComponent', () => {
  let dialogRef: jasmine.SpyObj<MatDialogRef<ErrorDialogComponent>>;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  });

  // Helper function to create component with specific data
  function setupTest(dialogData: any) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        ErrorDialogComponent,
        TEST_ALL_IMPORTS,
        MatIconModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    });
    
    const fixture = TestBed.createComponent(ErrorDialogComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create', () => {
    const { component } = setupTest({ message: 'Test error message' });
    expect(component).toBeTruthy();
  });

  describe('Error mode', () => {
    it('should display error icon', () => {
      const { fixture } = setupTest({
        success: false,
        message: 'Test error message'
      });
      
      const errorIcon = fixture.debugElement.query(By.css('.error-icon.error'));
      expect(errorIcon).toBeTruthy();
      expect(errorIcon.nativeElement.textContent).toBe('error');
    });

    it('should have default title "Erro"', () => {
      const { fixture } = setupTest({
        success: false,
        message: 'Test error message'
      });
      
      const title = fixture.debugElement.query(By.css('h2'));
      expect(title.nativeElement.textContent.trim()).toBe('Erro');
    });

    it('should use provided title when available', () => {
      const { fixture } = setupTest({
        success: false,
        title: 'Custom Error Title',
        message: 'Test error message'
      });

      const title = fixture.debugElement.query(By.css('h2'));
      expect(title.nativeElement.textContent.trim()).toBe('Custom Error Title');
    });

    it('should have error message', () => {
      const { fixture } = setupTest({
        success: false,
        message: 'Test error message'
      });
      
      const message = fixture.debugElement.query(By.css('p'));
      expect(message.nativeElement.textContent.trim()).toBe('Test error message');
    });

    it('should have warn colored button', () => {
      const { fixture } = setupTest({
        success: false,
        message: 'Test error message'
      });
      
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.attributes['ng-reflect-color']).toBe('warn');
    });
  });

  describe('Success mode', () => {
    it('should display success icon', () => {
      const { fixture } = setupTest({
        success: true,
        message: 'Operation successful'
      });
      
      const successIcon = fixture.debugElement.query(By.css('.error-icon.success'));
      expect(successIcon).toBeTruthy();
      expect(successIcon.nativeElement.textContent).toBe('check_circle');
    });

    it('should have default title "Sucesso"', () => {
      const { fixture } = setupTest({
        success: true,
        message: 'Operation successful'
      });
      
      const title = fixture.debugElement.query(By.css('h2'));
      expect(title.nativeElement.textContent.trim()).toBe('Sucesso');
    });

    it('should have primary colored button', () => {
      const { fixture } = setupTest({
        success: true,
        message: 'Operation successful'
      });
      
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.attributes['ng-reflect-color']).toBe('primary');
    });
  });

  describe('Button text', () => {
    it('should have default button text "Fechar"', () => {
      const { fixture } = setupTest({
        message: 'Test message'
      });

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.textContent.trim()).toBe('Fechar');
    });

    it('should use custom button text when provided', () => {
      const { fixture } = setupTest({
        message: 'Test message',
        buttonText: 'Custom Button'
      });

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.textContent.trim()).toBe('Custom Button');
    });
  });

  describe('HTML content', () => {
    beforeEach(() => {
      sanitizer = TestBed.inject(DomSanitizer);
    });
    
    it('should render HTML content when provided', () => {
      const htmlContent = sanitizer.bypassSecurityTrustHtml('<strong>Bold text</strong>');
      
      const { fixture } = setupTest({
        message: 'Test message',
        html: htmlContent
      });

      const htmlContainer = fixture.debugElement.query(By.css('.html-content'));
      expect(htmlContainer).toBeTruthy();
    });

    it('should not show HTML container when no HTML content', () => {
      const { fixture } = setupTest({
        message: 'Test message'
      });

      const htmlContainer = fixture.debugElement.query(By.css('.html-content'));
      expect(htmlContainer).toBeFalsy();
    });
  });

  describe('Close behavior', () => {
    it('should close dialog when button is clicked', () => {
      const { fixture } = setupTest({
        message: 'Test message'
      });

      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
