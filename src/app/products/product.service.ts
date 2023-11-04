import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, exhaustMap, map, take, tap } from "rxjs";
import { Product } from "./Product";
import { AuthService } from "../authentication/auth.service";
import { environment } from "src/environments/environment";

@Injectable()
export class ProductService{
    private url = environment.database_url;
    constructor(
        private http:HttpClient,
        private authService:AuthService
    ){}

    getProducts(categoryId:number): Observable<Product[]>{
        return this.http
        .get<Product[]>(this.url+"products.json")
        .pipe(
            map(data=>{
                const products: Product[]=[]

                for(const key in data){
                    if(categoryId){
                        if(categoryId == data[key].categoryId){
                            products.push({...data[key], id:key})
                        }  
                    }
                    else{
                        products.push({...data[key], id:key})
                    }
                }

                return products;
            }),
            delay(1000)
        )
    }

    createProduct(product:Product):Observable<Product>{
        return this.authService.user.pipe(
            take(1),
            tap(user=>console.log(user)),
            exhaustMap(user=>{ //exhaustMap user nesnesinin gelmesini bekler
                return this.http.post<Product>(this.url+"/products.json?auth="+user?.token,product)
            })
        )
        
    }
    
    getProductById(id:any):Observable<Product>{
        return this.http.get<Product>(this.url+"/products/"+id+".json").pipe(delay(1000))
    }
    
}