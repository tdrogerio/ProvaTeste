import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  styles: [`
    :host {
      display: block;
    }
    
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 999;
    }
  `]
})
export class LoadingComponent {
  @Input() diameter: number = 40;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() overlay: boolean = false;
}
