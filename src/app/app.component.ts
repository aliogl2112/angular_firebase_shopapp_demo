
import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  //selector: '.app', class selector
  selector: '#app', //id selector
  // selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  private title = 'Home Page';

  constructor(
    private authService:AuthService
  ){}

    ngOnInit(): void {
      this.authService.autoLogin();
    }
  getTitle=():string=>this.title;

}
