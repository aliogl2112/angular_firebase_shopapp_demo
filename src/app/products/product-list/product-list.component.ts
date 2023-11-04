import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[ProductService] //inject edilecekler providers içerisine yazılır
})
export class ProductListComponent {
  products:Product[]=[];
  loading:boolean=false
  constructor(
    private route: ActivatedRoute,
    private productService:ProductService
    ) {}

  ngOnInit():void{
    this.route.params.subscribe(params=>{
      this.loading=true;
      const id = params["categoryID"];
      this.productService.getProducts(id)
      .subscribe(result=>{
        this.products=result
        this.loading=false
      })
    })
  }

}
