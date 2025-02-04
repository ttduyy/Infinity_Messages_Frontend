import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Login$Params, login } from 'app/services/fn/authentication-controller/login';
import { LoginDto } from 'app/services/models';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  rootUrl = environment.apiBaseUrl;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private loginService: LoginService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const loginDto: LoginDto = {
        username: formData.username, 
        password: formData.password,
        rememberMe: formData.rememberMe
      };
      console.log(loginDto.username + ' ' + loginDto.password + ' ' + loginDto.rememberMe);
      const params: Login$Params = {
        body: loginDto
      };  
      this.loginService.login(loginDto).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log('Login failed', error);
        },
        complete: () => {
          console.log('Login process completed');
        }
      })
      }
    }
  }





