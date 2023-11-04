import {filter, first, from,map,of} from "rxjs"

from(['toyota','audi']).subscribe(data=>console.log("from: ",data)) //arrayden observable bilgi üretmek için kullanılır.
of('bmw','renault').subscribe(data=>console.log("of: ",data)) //from a alternatif olarak bilgileri parametre olarak göndermek için kullanılır

from([1,4,7,9.10])
.pipe(
    filter(n=>n%2==0), //istediğimiz filtreye uygun sayıları getirir
    first() //geriye dönen değerlerden ilkini getirir. filter kullanmadan first(n=>n%2==0,11) şeklinde de kullanılabilir. n%2==0 ifadesi geriye bir değer döndürmezse 2. parametre olarak verdiğimiz 11 değerini döndürür.
    //last() geriye dönen değerlerden son değeri getirir
    //take(2) geriye dönen değerlerden ilk ikisini getirir
    // map(n=>n%2==0) bool değer döner
)
.subscribe({
    next:(data)=>console.log(data),
    error:(err)=>console.log(err.message)
})

from([
    {name:"Samsung S23",price:20000},
    {name:"Samsung S24",price:30000},
    {name:"Samsung S25",price:40000},
])
    .pipe(
        filter(p=>p.price>20000),
        map(p=>p.name)
    )
    .subscribe(data=>console.log(data))