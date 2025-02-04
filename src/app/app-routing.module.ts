import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFound404Component } from './exceptions/not-found-404/not-found-404.component';
import { InternalServer500Component } from './exceptions/internal-server-500/internal-server-500.component';

const routes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: MainPageComponent},

  {path: "register", component: RegisterComponent},
  {path: "500", component: InternalServer500Component},


  {path: "**", component: NotFound404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
