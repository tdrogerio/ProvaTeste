import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProvaTeste';
}


@NgModule({
  imports: [
    MatDialogModule,
    // outros módulos...
  ],
})
export class AppModule {}