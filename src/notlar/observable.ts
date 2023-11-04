import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ThrowError } from "ts-evaluator";

/*OBSERVABLE*/

const observable = new Observable<string>((subscriber)=>{
    subscriber.next("1");
    subscriber.next("2");
    subscriber.next(Math.random().toString());
    setTimeout(()=>{
        subscriber.next("3");
    },1000);
});

const observer={
    next:(value:any)=>console.log(value),
    error:(err:ThrowError)=>console.log(err),
    complete:()=>console.log("bitti")
}

//observable.subscribe(observer);

observable.subscribe((data)=>console.log('observable 1: '+data));//observable(gözlenebilir) bir nesneye her seferinde farklı bir çalışma alanı içerisinde ulaştığımızdan random üretilen sayı bilgisi her seferinde farklıdır.
observable.subscribe((data)=>console.log('observable 2: '+data));

/*SUBJECT*/

const subject = new Subject<number>();

subject.subscribe(data=>console.log("s1: ",data)); //tek bir kanala ait olan veri akışı o kanala subs olan tüm gözlemci fonksiyonlarına aynı anda aktarılır 
subject.subscribe(data=>console.log("s2: ",data));
subject.subscribe(data=>console.log("s3: ",data));

subject.next(1); //next işlemini subscribeden sonra yapmamızın sebebi, subject yapısına sub olunduğunda kendisinden önce kanala eklenen verileri görememesidir.
subject.next(2);
subject.next(Math.random());
subject.next(Math.random());

/*BEHAVIOR SUBJECT*/

const behaviorSubject=new BehaviorSubject(-1);//başlangıç değeri istiyor.

behaviorSubject.next(-2)//behaviorsubject yapısı subsdan önce kanala eklenen verilerin görünmesini sağlar.
behaviorSubject.next(-3)//aşağıda ekrana -3 yazar çünkü yalnızca kendinden önce gelen son değeri görebilir
behaviorSubject.subscribe(data=>console.log(data))