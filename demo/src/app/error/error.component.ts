import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule,RouterOutlet,LogInComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
}
