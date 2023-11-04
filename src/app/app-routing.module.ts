import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'',redirectTo:"/home",pathMatch:"full"},
  {path:'products',loadChildren:()=>import('./products/products.module').then(m=> //products modülü, sayfa ilk yüklendiğinde değil, products linkine gittiğimizde yüklenecek
    m.ProductsModule)},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
