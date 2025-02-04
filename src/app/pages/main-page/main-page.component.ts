import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { checkLogin } from 'app/services/fn/authentication-controller/check-login';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '@env/environment';
import { CommentDto, MessageDto, UserDto } from 'app/services/models';
import { getAllMessage } from 'app/services/fn/message-controller/get-all-message';
import { getCommentsTree } from 'app/services/fn/comment-controller/get-comments-tree';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { postMessage } from 'app/services/fn/message-controller/post-message';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  rootUrl = environment.apiBaseUrl;

  postForm!: FormGroup;
  user: UserDto | null = null;
  isLogin = false;

  isPostBoxVisible = false;
  postContent = '';
  wordCount = 0;

  posts: Array<MessageDto> = [];
  comments: Array<CommentDto> = [];
  listCommentsForEachPost: Array<CommentDto> = [];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cookieService: CookieService) { }
  ngOnInit(): void {
    this.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        console.log('User is logged in.');
        this.postForm = this.formBuilder.group({
          content: ['', [Validators.minLength(3), Validators.maxLength(200)]],
        });
      }
    });
    this.getPosts();
    
  }

  updateWordCount(): void {
    const content = this.postContent ? this.postContent.trim() : '';
    console.log('Content:', content);
    this.wordCount = content.split(/\s+/).length;
    console.log('Word count:', this.wordCount);
    
  }

  showPostBox(): void {
    this.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        console.log('Showing post box...');
        this.isPostBoxVisible = true;
        
      } else {
        console.log('You must be logged in to post.');
        alert('You must be logged in to post.');
      }
    });
  }

  submitPost(): void {
    if (this.wordCount > 0) {
      if (this.postForm.valid) {
        const formData = this.postForm.value;
        console.log('Form data:', formData);
        const messageDto: MessageDto = {
          createAt: new Date().toISOString(),
          username: this.user?.username ?? 'Anonymous',
          content: formData.content,
        };
        console.log('Message DTO:', messageDto);
        postMessage(this.http, this.rootUrl, { body: messageDto }).subscribe({
          next: (response) => { 
            console.log('Post submitted:', response); 
            this.getPosts();
          },
          error: (error) => { console.log('Post submission failed:', error); },
          complete: () => { console.log('Post submission process completed'); },
        });
        // console.log('Post submitted:', this.postContent);
        this.resetPostBox();
        
      }
    }
  }

  closePostBox(): void {
    this.resetPostBox();
  }

  private resetPostBox(): void {
    this.postContent = '';
    this.wordCount = 0;
    this.isPostBoxVisible = false;
  }

  getPosts(): void {
    getAllMessage(this.http, this.rootUrl).subscribe({
      next: (response) => {
        this.posts = response.body.data;
        if (this.posts.length === 0) {
          console.log('No post found');
          return;
        }

        for (const post of this.posts) {
          if (post.id) {
            this.getComments(post.id).subscribe(comments => {
              post.comments = comments; // Gán bình luận vào bài viết
              console.log('Post with comments:', post);
            });
          } else {
            console.warn('Post has undefined ID.');
          }
        }
      },
      error: (error) => {
        console.log('Failed to get posts', error);
      },
      complete: () => {
        console.log('Get posts process completed');
      },
    });
  }


  // getComments(messageId: string): void {
  //   const getComments$Params = { messageId };
  //   getCommentsTree(this.http, this.rootUrl, getComments$Params).subscribe({
  //     next: (response) => {
  //       this.listCommentsForEachPost = response.body.data;
  //       for (let i = 0; i < this.listCommentsForEachPost.length; i++) {
  //         this.comments.push(this.listCommentsForEachPost[i]);
  //       }
  //     },        
  //     error: (error) => {
  //       console.log('Failed to get comments', error);
  //     },
  //     complete: () => {
  //       console.log('Get comments process completed');        
  //     }
  //     });
  // }
  getComments(messageId: string): Observable<CommentDto[]> {
    const getCommentsTree$Params = { messageId };
    return getCommentsTree(this.http, this.rootUrl, getCommentsTree$Params).pipe(
      map(response => response.body.data), // Lấy dữ liệu từ phản hồi
      catchError(error => {
        console.log('Failed to get comments', error);
        return of([]); // Trả về mảng rỗng nếu xảy ra lỗi
      })
    );
  }


  isLoggedIn(): Observable<boolean> {
    const token = this.cookieService.get('JWT_TOKEN');  // Lấy JWT từ cookie
    const headers = new HttpHeaders({
      'cookie': `${token}`  // Đính kèm token
    });
    const options = {
      mode: 'no-cors'
    };


    return this.http.get<{ loggedIn: boolean, user: UserDto }>(this.rootUrl + "/api/auth/check-login", { headers, withCredentials: true }).pipe(
      tap(response => {
        console.log('API Response:', response),
          this.user = response.user,
          this.isLogin = response.loggedIn;


      }), // In phản hồi để kiểm tra
      map(response => response.loggedIn), // Trả về trạng thái đăng nhập từ server

      catchError(() => {
        return of(false); // Trả về false nếu có lỗi xảy ra
      })
    );
  }




}
