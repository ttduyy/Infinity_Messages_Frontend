import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { LoginDto, UserDto } from 'app/services/models';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;
  // private refreshTokenUrl = 'http://localhost:8080/refresh-token';


  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  // Phương thức login
  login(body: LoginDto): Observable<any> {
    // const body = { username, password };
    return this.http.post(this.apiServerUrl + "/api/auth/login", body, { withCredentials: true }).pipe(
      tap((response: any) => {
        console.log(response); // Debug thông tin trả về từ server
        if (response && response.success) {
          console.log(response.success)
          this.router.navigateByUrl('');  // Chuyển hướng đến trang /chat
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }


  // Xử lý lỗi chung
  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

 
}
