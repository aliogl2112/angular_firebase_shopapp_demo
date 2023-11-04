"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/*OBSERVABLE*/
var observable = new rxjs_1.Observable(function (subscriber) {
    subscriber.next("1");
    subscriber.next("2");
    subscriber.next(Math.random().toString());
    setTimeout(function () {
        subscriber.next("3");
    }, 1000);
});
var observer = {
    next: function (value) { return console.log(value); },
    error: function (err) { return console.log(err); },
    complete: function () { return console.log("bitti"); }
};
//observable.subscribe(observer);
observable.subscribe(function (data) { return console.log('observable 1: ' + data); });
observable.subscribe(function (data) { return console.log('observable 2: ' + data); });
/*SUBJECT*/
var subject = new rxjs_1.Subject();
subject.subscribe(function (data) { return console.log("s1: ", data); });
subject.subscribe(function (data) { return console.log("s2: ", data); });
subject.subscribe(function (data) { return console.log("s3: ", data); });
subject.next(1);
subject.next(2);
subject.next(Math.random());
subject.next(Math.random());
