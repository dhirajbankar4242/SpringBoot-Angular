import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [   RouterOutlet, ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  
[x: string]: any;

public spinkit = Spinkit;

}
