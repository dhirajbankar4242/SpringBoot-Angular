import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxPermissionsModule } from 'ngx-permissions';
import Swal from 'sweetalert2';
import { AdminModule } from '../admin/admin.module';
import { Global } from '../admin/dto/dtos';
import { HttpService } from '../service/http.service';
import { StorageService } from '../service/storage.service';

interface CustomJwtPayload {
  tenantType: string;
}

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, AdminModule, RouterModule, NgxPermissionsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  tenantType: string | null = null
  LogInForm: FormGroup

  constructor(private service: HttpService, private fb: FormBuilder, private router: Router, private localStorage: StorageService) {
    this.LogInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogIn() {
    if (this.LogInForm.valid) {
      const values = this.LogInForm.value
      this.service.login(values).subscribe(
        (result) => {
          if (result) {
            const decodedToken = jwtDecode<CustomJwtPayload>(result.token)
            this.tenantType = decodedToken.tenantType
            this.localStorage.setTenantType('tenant', this.tenantType)
            this.checkLogin(result);
            this.router.navigate(['/admin/home']);
          }
        },
        (error: any) => {
          console.error(error);
          Swal.fire({
            icon: 'warning',
            text: 'Username or password incorrect  An error occurred during login. Please try again.'
          });
        }
      );
    }
  }

  checkLogin(result: any) {
    const localStorage = new StorageService()
    localStorage.setItem(Global.key_token, result.token);
    this.router.navigate(['/admin/home']);
  }

}
