import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { OperatorMenuComponent } from './operator-menu/operator-menu.component';
import { StandaloneComponentsModule } from './standalone-components/standalone-components.module'; 
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OperatorMenuComponent,
    ServicesComponent,
     ContactComponent,
     DashboardComponent,
     ReportComponent,
     AdminMenuComponent,
     ChangePasswordComponent
     
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StandaloneComponentsModule, // Importa el módulo de componentes standalone aquí
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    ReactiveFormsModule 
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
