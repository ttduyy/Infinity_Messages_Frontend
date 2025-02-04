import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { register, Register$Params } from 'app/services/fn/authentication-controller/register';
import { UserDto } from 'app/services/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  rootUrl = environment.apiBaseUrl;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Khởi tạo form
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
    console.log(this.fb)
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Tạo một object UserDto
      const userDto: UserDto = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      console.log(userDto.username)

      // Thiết lập các params cho API register
      const params: Register$Params = {
        body: userDto
      };

     
      register(this.http, this.rootUrl, params).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Registration failed', error);
        },
        complete: () => {
          console.log('Registration process completed');
        }
      });

    } else {
      console.log('Form is invalid');
    }
  }
}
