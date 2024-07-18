import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { BackendService } from 'src/service/backend.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router : Router, private backendService: BackendService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email : [''],
      password : ['']
    });
  }

  onSubmit() {
    this.backendService.login(   
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
      )
      .subscribe(
      (data) => {
        localStorage.setItem('authToken', data.jwt);
        this.authService.login(data.jwt);
        this.router.navigate(['/all']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
