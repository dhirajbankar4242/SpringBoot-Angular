import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import Swal from 'sweetalert2';
import { response } from 'express';
import { OrderByPipe } from "../../service/order-by.pipe";
import { StorageService } from '../../service/storage.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OrderByPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dataForm: FormGroup;
  data:any

  constructor(private formBuilder: FormBuilder, private service: HttpService, private router: Router, private route: ActivatedRoute,private storage:StorageService,private permissionService:NgxPermissionsService) {
    this.dataForm = this.formBuilder.group({
      entryName: ['', Validators.required],
      humidity: ['', Validators.required],
      temp: ['', Validators.required],
      alarm: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.service.get('censorDetails').subscribe(data=>{
      this.data=data;
    })
  }

  onSaveData(): void {
    const val = this.dataForm.value;
    val.subscription = val.selectedCard;
    this.service.post('censorDetails', val).subscribe(
      (response: any) => {
        Swal.fire({ text: 'Your record has been created successfully' });
        this.getData();
        this.dataForm.reset();
      },
      (error: any) => {
        Swal.fire({ text: 'Error while saving record' });
        console.error('Error:', error);
      }
    );
  }

  action(data:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, trigger it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.service.put(`censorDetails/trigger`, data).subscribe(response=>{          
          this.getData();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  action_2(data:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, trigger it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.service.put(`censorDetails/trigger2`, data).subscribe(response=>{          
          this.getData();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  signOut() {
    this.storage.clear().then(() => {
      this.permissionService.flushPermissions();
      this.router.navigate(['']);
    });
  }


}
