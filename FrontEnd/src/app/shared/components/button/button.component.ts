import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'basic' | 'raised' | 'stroked' | 'flat';

// Definindo tipos para as cores disponíveis
type ButtonColor = 
  | 'primary' 
  | 'accent' 
  | 'warn'
  | 'blue' 
  | 'red' 
  | 'green' 
  | 'yellow' 
  | 'purple' 
  | 'orange' 
  | 'gray' 
  | 'black' 
  | 'white';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() size: ButtonSize = 'medium';
  @Input() type: ButtonType = 'basic';
  @Input() color: ButtonColor = 'primary';
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  
  @Output() onClick = new EventEmitter<MouseEvent>();

  get sizeClass(): string {
    return `btn-${this.size}`;
  }

  get colorClass(): string {
    return this.color === 'primary' || this.color === 'accent' || this.color === 'warn' 
      ? '' 
      : `color-${this.color}`;
  }
}
