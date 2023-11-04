import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductComponent } from "./product-list/product/product.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AdminGuard } from "../authentication/admin-guard";
import { AuthenticationModule } from "../authentication/authentication.module";

const routes:Routes=[
    {
        path:"",
        children:[
            {path:'create',component:CreateProductComponent,canActivate:[AdminGuard]},
            {path:'',component:ProductListComponent},
            {path:':productID',component:ProductComponent},
            {path:'category/:categoryID',component:ProductListComponent}
        ]
    }
]
@NgModule({
    declarations:[
        ProductListComponent,
        ProductComponent,
        CreateProductComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        AuthenticationModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        ProductListComponent,
        ProductComponent,
        CreateProductComponent
    ]
})
export class ProductsModule{}