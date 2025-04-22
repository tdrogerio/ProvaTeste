import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingComponent } from './loading.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoadingComponent,
        NoopAnimationsModule,
        MatProgressSpinnerModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('Spinner configuration', () => {
    it('should have default diameter of 40', () => {
      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(component.diameter).toBe(40);
      expect(spinner.attributes['ng-reflect-diameter']).toBe('40');
    });
    
    it('should change diameter when input is set', () => {
      component.diameter = 60;
      fixture.detectChanges();
      
      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner.attributes['ng-reflect-diameter']).toBe('60');
    });
    
    it('should have primary color by default', () => {
      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(component.color).toBe('primary');
      expect(spinner.attributes['ng-reflect-color']).toBe('primary');
    });
    
    it('should change color when input is set', () => {
      component.color = 'warn';
      fixture.detectChanges();
      
      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner.attributes['ng-reflect-color']).toBe('warn');
    });
  });
  
  describe('Overlay mode', () => {
    it('should not have overlay class by default', () => {
      const container = fixture.debugElement.query(By.css('div'));
      expect(component.overlay).toBeFalse();
      expect(container.classes['overlay']).toBeFalsy();
    });
    
    it('should add overlay class when overlay is true', () => {
      component.overlay = true;
      fixture.detectChanges();
      
      const container = fixture.debugElement.query(By.css('div'));
      expect(container.classes['overlay']).toBeTrue();
    });
  });
});
