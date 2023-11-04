import {NgModule} from '@angular/core'
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../authentication/authentication.module';

@NgModule({
    declarations:[
        HomeComponent,
        NavbarComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path:'home',component:HomeComponent},
        ]),
        AuthenticationModule
    ],
    exports:[
        HomeComponent,
        NavbarComponent
    ]
})

export class SharedModule{}