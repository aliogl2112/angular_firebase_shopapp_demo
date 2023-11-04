import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  providers:[CategoryService]
})
export class CreateCategoryComponent {
  constructor(
    private categoryService:CategoryService,
    private router: Router
    ){}
  ngOnInit():void{}
  saveCategory(name:any){
    this.categoryService.createCategory({id:0,name:name.value}).subscribe(data=>{
      console.log(data);
      this.router.navigate(["/products"]);
      window.location.reload();
    })
  }
}
