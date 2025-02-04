import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NavMainPageComponent } from './pages/main-page/nav/nav-main-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFound404Component } from './exceptions/not-found-404/not-found-404.component';
import { InternalServer500Component } from './exceptions/internal-server-500/internal-server-500.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { PostComponent } from './pages/main-page/post/post.component';
import { CommentComponent } from './pages/main-page/comment/comment.component'; // Import PostComponent


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PostComponent,
    NavMainPageComponent,
    LoginComponent,
    RegisterComponent,
    NotFound404Component,
    InternalServer500Component,
    CommentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withFetch()), // Thêm withFetch() để sử dụng API fetch
    provideClientHydration() // Giữ lại cấu hình client hydration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
