import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { getBaseUrl } from '../../app.browser.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']

})
export class ToDosComponent implements OnInit {
    public todos: ToDo[];
    public users: User[];
    filteredUsers: Observable<User[]>;

    _http: HttpClient;
    showAdd: boolean = false;
    todoFormGroup: FormGroup;
    newToDo: ToDo;

    constructor(//http: Http, 
        http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        private _formBuilder: FormBuilder) {
        // Remove this
        // http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
        //     this.forecasts = result.json() as WeatherForecast[];
        // }, error => console.error(error));

        this._http = http;
    }

    ngOnInit() {
        this._http.get('https://jsonplaceholder.typicode.com/todos')
            .subscribe(result => {
                this.todos = result as ToDo[];
            }, error => console.error(error));

        this._http.get('https://jsonplaceholder.typicode.com/users')
            .subscribe(result => {
                this.users = result as User[];
                console.log(this.users);
            },
            error => { console.error(error) });

        this.todoFormGroup = this._formBuilder.group({
            userId: ['', Validators.required],
            title: ['', Validators.required],
            completed: [false]
        });

        this.filteredUsers = this.todoFormGroup.controls.userId.valueChanges
        .pipe(
          startWith(''),
          map(name =>name ? this.filterUsers(name) : this.users.slice())
        );

    }

    OnDelete(id: number, index: number) {
        this._http.delete('https://jsonplaceholder.typicode.com/todos/' + id)
            .subscribe(result => {
                console.log(`deleted ${id}`);
                this.todos.splice(index, 1);
            }, error => { console.error(`failed to delete todo ${id}`) });

    }

    /*
        If you want the option's control value (what is saved in the form) to be different than the option's 
        display value (what is displayed in the actual text field), you'll need to set the displayWith property on your autocomplete element. 
        A common use case for this might be if you want to save your data as an object, but display just one of the option's string properties.
        To make this work, create a function on your component class that maps the control value to the desired display value. 
        Then bind it to the autocomplete's displayWith property.
    */
    displayFn(user: User): string {
        return user ? user.name : '';
      }

    OnShowAdd() {
        console.log("showAdd", this.showAdd);

        if (!this.showAdd) { this.showAdd = true; console.log("showAdd", this.showAdd); return; }

        this.showAdd = !this.showAdd;
    }

    OnAdd(event: any) {
        console.log(event);
        console.log(this.todoFormGroup.value);

        /*
            if the value from the drop down is user you need to map from user 
            to user id
            it's better to select the whole object so you ca use it for display purposes
            and then take the data you need later. 
            this.newToDo = this.todoFormGroup.value as ToDo;
         */
        this.newToDo = {
            userId : this.todoFormGroup.controls.userId.value.id,
            id : 0,
            title : this.todoFormGroup.controls.title.value,
            completed : this.todoFormGroup.controls.completed.value,

        };
        
       

        this._http.post('https://jsonplaceholder.typicode.com/todos/', this.newToDo)
            .subscribe(result => {
                console.log(`inserted`,this.newToDo);
                this.todos.push(result as ToDo);
                //(<FormGroup>this.todoFormGroup).setValue({userId : null, title : null, completed : false}, { onlySelf: true });
                this.todoFormGroup.reset();
                this.showAdd = false;
            }, error => { console.error(`failed to post todo ${this.newToDo}`) });

    }

    filterUsers(name: string) {
        if(typeof name != 'string'){return this.users;}
        
        console.log('name',name);
        
        return this.users.filter(user =>
          user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
      }
}

interface ToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

/*
    User information
*/
interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}