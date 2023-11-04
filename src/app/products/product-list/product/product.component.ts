import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../Product';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { ProductService } from '../../product.service';


@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent{
  //@Input() prd:Product parent componenteden prop alıyoruz.;

  product:Product | undefined;
  loading:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private productService:ProductService
    ){
  }
  ngOnInit():void{
    this.route.params.subscribe(params=>{
      this.loading=true;
      const id = params["productID"];
      this.productService.getProductById(id)
      .subscribe(result=>{
        this.product={...result,id:id}
        this.loading=false;
      } )
    })
  }


  // @Output() unSelectEvent = new EventEmitter<void>(); dışarıya veri gönderiyoruz

  // unselectProduct(){
  //   this.unSelectEvent.emit();
  // }

}
