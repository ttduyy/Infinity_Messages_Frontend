import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'app/services/models/user-dto';  // Thay đổi nếu đường dẫn khác

@Component({
  selector: 'app-nav-main-page',
  templateUrl: './nav-main-page.component.html',
  styleUrls: ['../main-page.component.css']
})
export class NavMainPageComponent {

  @Input() isLogin: boolean = false;
  @Input() user: UserDto | null = null;

  constructor() { }

  // Hàm điều hướng tới trang đăng nhập (Ví dụ, bạn có thể sử dụng Router để điều hướng)
  redirectToLogin(): void {
    // Giả sử bạn dùng Angular Router để điều hướng
    window.location.href = '/login';  // Hoặc dùng Router như sau: this.router.navigate(['/login']);
  }
}
