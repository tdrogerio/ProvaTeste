import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { DebugElement } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button types', () => {
    it('should render as a basic button by default', () => {
      expect(buttonEl.nativeElement.classList.contains('mat-raised-button')).toBeFalse();
      expect(buttonEl.nativeElement.classList.contains('mat-stroked-button')).toBeFalse();
      expect(buttonEl.nativeElement.classList.contains('mat-flat-button')).toBeFalse();
    });

    it('should render as a raised button when type is set to raised', () => {
      component.type = 'raised';
      fixture.detectChanges();
      expect(buttonEl.nativeElement.classList.contains('mat-raised-button')).toBeTrue();
    });

    it('should render as a stroked button when type is set to stroked', () => {
      component.type = 'stroked';
      fixture.detectChanges();
      expect(buttonEl.nativeElement.classList.contains('mat-stroked-button')).toBeTrue();
    });

    it('should render as a flat button when type is set to flat', () => {
      component.type = 'flat';
      fixture.detectChanges();
      expect(buttonEl.nativeElement.classList.contains('mat-flat-button')).toBeTrue();
    });
  });

  describe('Button sizes', () => {
    it('should have medium size by default', () => {
      expect(buttonEl.nativeElement.classList.contains('btn-medium')).toBeTrue();
    });

    it('should have small size when size is set to small', () => {
      component.size = 'small';
      fixture.detectChanges();
      expect(buttonEl.nativeElement.classList.contains('btn-small')).toBeTrue();
    });

    it('should have large size when size is set to large', () => {
      component.size = 'large';
      fixture.detectChanges();
      expect(buttonEl.nativeElement.classList.contains('btn-large')).toBeTrue();
    });
  });

  describe('Button colors', () => {
    it('should use primary color by default without custom color class', () => {
      expect(component.colorClass).toBe('');
    });

    it('should not add color class for primary, accent, or warn', () => {
      component.color = 'primary';
      expect(component.colorClass).toBe('');
      
      component.color = 'accent';
      expect(component.colorClass).toBe('');
      
      component.color = 'warn';
      expect(component.colorClass).toBe('');
    });

    it('should add the correct color class for custom colors', () => {
      component.color = 'blue';
      expect(component.colorClass).toBe('color-blue');
      
      component.color = 'red';
      expect(component.colorClass).toBe('color-red');
    });
  });

  describe('Button state', () => {
    it('should not be disabled by default', () => {
      expect(buttonEl.nativeElement.disabled).toBeFalse();
    });

    it('should be disabled when disabled input is true', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(buttonEl.nativeElement.disabled).toBeTrue();
    });
  });

  describe('Custom class', () => {
    it('should apply custom class when provided', () => {
      component.customClass = 'test-class';
      fixture.detectChanges();
      expect(buttonEl.nativeElement.classList.contains('test-class')).toBeTrue();
    });
  });

  describe('Click event', () => {
    it('should emit onClick event when button is clicked', () => {
      spyOn(component.onClick, 'emit');
      buttonEl.nativeElement.click();
      expect(component.onClick.emit).toHaveBeenCalled();
    });

    it('should not emit onClick event when button is disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      spyOn(component.onClick, 'emit');
      buttonEl.nativeElement.click();
      expect(component.onClick.emit).not.toHaveBeenCalled();
    });
  });
});
