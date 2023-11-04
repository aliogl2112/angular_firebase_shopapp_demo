import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {

  repassError:boolean=false;
  isLoginMode:boolean=false;
  loading:boolean=false;
  error:string="";

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  changeMode():void{
    this.isLoginMode=!this.isLoginMode
  }

  handleAuth(form:NgForm):void{
    let authResponse:Observable<AuthResponse>
    this.loading=true;
    const email = form.value.email;
    const password = form.value.password;
    if(!this.isLoginMode)
      this.repassError=form.value.repassword !== form.value.password?true:false
    if(form.valid && !this.repassError){
      if(!this.isLoginMode){
        authResponse = this.authService.createAccount(email,password);
      }
      else{
        authResponse = this.authService.login(email,password);
      } 
    }
    else{
      this.error="Parola bilgileri eşleşmiyor. Lütfen doğru yazdığınızdan emin olun.";
      return;
    }
      
    authResponse.subscribe({
      next:(response)=>{ //işlem başarıyla gerçekleşmişse
        this.loading=false;
        this.error="";
        this.router.navigate(['/products']);
      },
      error:(err)=>{ //hata yakalanmışsa
        this.loading=false;
        this.error=err;
        
      }

    })
  }

}
