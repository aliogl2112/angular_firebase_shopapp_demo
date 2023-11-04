import { Component } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated:boolean=false;
  isAdmin:boolean=false;

  constructor(
    private authService:AuthService
  ){}
  
  ngOnInit():void{
    this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user; //null değer gelirse false, değilse true
      this.isAdmin=user?.email=="deneme@admin.com";
    })
  }
  logout(){
    this.authService.logout();
  }
}
