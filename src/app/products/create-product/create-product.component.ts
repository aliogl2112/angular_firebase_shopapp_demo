import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/Category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers:[ProductService,CategoryService]
})
export class CreateProductComponent {

  categories:Category[]=[]
  constructor(
    private productSerive:ProductService,
    private router:Router,
    private categoryService:CategoryService
    ){}

    error:string=""
    model:any={
      "categoryId":0
    }; //two-way binding yani

    //ngModel => control -- formda kullandığımız ngModel
    //ngForm => tüm modelleri kapsayan form 

    //valid-invalid => formun veya tek bir ngModel in geçerli veya geçersiz olma duruumu
    //pristine - dirt => controle yazı yazılmama ve yazılma durumu

    //touched-untouched => herhangi bir kontrole dokunma veya dokunmama durumu
  
  ngOnInit():void{
    this.categoryService.getCategories().subscribe(result=>{
      this.categories=result
    })
  }
  saveProduct(form:NgForm){
    const extensions=["jpeg","jpg","png"];
    const extension = this.model.imgUrl.split(".").pop();

    if(extensions.indexOf(extension)==-1){
      this.error = "Geçersiz resim. Lütfen seçtiniğiniz resim 'jpeg, jpg veya png' uzantılı olsun.";
      return;
    }

    if(this.model.categoryId == 0){
      this.error = "Lütfen kategori seçin.";
      return;
    }
    this.error="";
    console.log(this.model)
    // name:any,price:any,imgUrl:any,description:any,isActive:any,categoryId:any
    const product={
      id:1,
      name:this.model.name,
      description:this.model.description,
      price:Math.abs(this.model.price),
      imgUrl:this.model.imgUrl,
      isActive:this.model.isActive,
      categoryId:this.model.categoryId
    };

    if(form.valid){
      this.productSerive.createProduct(product)
      .subscribe(data=>{
        this.router.navigate(['/products'])
      })
    }
    
  }
}
