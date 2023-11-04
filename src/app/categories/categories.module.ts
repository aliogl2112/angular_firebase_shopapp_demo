import { NgModule } from "@angular/core";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CreateCategoryComponent } from "./create-category/create-category.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminGuard } from "../authentication/admin-guard";
import { AuthService } from "../authentication/auth.service";
import { AuthenticationModule } from "../authentication/authentication.module";

@NgModule({
    declarations:[
        CategoryListComponent,
        CreateCategoryComponent
    ],
    imports:[
        CommonModule,
        AuthenticationModule,
        RouterModule.forChild([
            {path:'category/create',component:CreateCategoryComponent,canActivate:[AdminGuard]},
        ])
    ],
    exports:[
        CategoryListComponent,
        CreateCategoryComponent
    ]
})

export class CategoriesModule{

}