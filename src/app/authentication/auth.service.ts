import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})
export class AuthService {
  private apiKey=environment.apiKey;
  private signUpurl = environment.signUpurl+this.apiKey;
  private signInurl = environment.signInurl+this.apiKey;
  
  user = new BehaviorSubject<User | null>(null)

  constructor(private http:HttpClient) { }

  createAccount(email:string, password:string){
    return this.http.post<AuthResponse>(this.signUpurl,
      {email:email,password:password,returnSecureToken:true}
      ).pipe(
        tap(res=>{this.createUserModel(res)}),
        catchError(this.handleError)
      )
  }
  login(email:string,password:string){
    return this.http.post<AuthResponse>(this.signInurl,
      {email:email,password:password,returnSecureToken:true}
      ).pipe(
        tap(res=>{this.createUserModel(res)}),
        catchError(this.handleError)
      )
  }

  autoLogin(){
    if(localStorage.getItem("user")==null){
      return;
    }
    const user=JSON.parse(localStorage.getItem("user") || "");
    const loadedUser=new User(user.email,user.localId,user._token,new Date(user._tokenExpirationDate))
    console.log("loaded user: ",loadedUser)
    if(loadedUser.token){
      this.user.next(loadedUser)
    }
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("user");
  }

  private handleError(err:HttpErrorResponse){
    let message="Hata Oluştu";
    if(err.error.error){
      switch(err.error.error.message){
        case "EMAIL_EXISTS":
          message="Bu mail adresi zaten mevcut bir hesaba ait.";
          break;
        case "OPERATION_NOT_ALLOWED":
          message="Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message="Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin.";
          break;
        case "EMAIL_NOT_FOUND":
          message="Mail adresi bulunamadı.";
          break;
        case "INVALID_PASSWORD":
          message="Şifre yanlış. Lütfen bilgilerinizi kontrol edin.";
          break;
        case "INVALID_EMAIL":
          message="Mail bilgisi geçersiz. Lütfen geçerli bir mail girin.";
          break;
        case "INVALID_LOGIN_CREDENTIALS":
          message="Mail veya şifre bilgisi hatalı.";
          break;
        case "USER_DISABLED":
          message="Bu hesap yönetici tarafından devre dışı bırakıldı.";
          break;
      }
    }
    return throwError(()=>message) 
  }
  private createUserModel(res:AuthResponse){
    const expirationDate=new Date(new Date().getTime() + (+res.expiresIn *1000))//+ operatörü ile number tüürüne çevirdik
    const user = new User(
      res.email,
      res.localId,
      res.idToken,
      expirationDate
    )
    this.user.next(user);
    localStorage.setItem("user",JSON.stringify(user))
    console.log(user);
  }
}
