import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http'
import { getBaseUrl } from '../../app.browser.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
    
})
export class ToDosComponent implements OnInit {
    public todos: ToDo[];
    _http: HttpClient;
    showAdd : boolean = false;
    todoFormGroup: FormGroup;
    newToDo : ToDo;
 
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

    ngOnInit()
    {
        this._http.get('https://jsonplaceholder.typicode.com/todos')
        .subscribe(result => {
            this.todos = result as ToDo[];
        }, error => console.error(error));

        this.todoFormGroup = this._formBuilder.group({
            userId: ['', Validators.required],
            title: ['', Validators.required],
            completed : [false]
          });
        
    }

    OnDelete(id:number, index:number)
    {
        this._http.delete('https://jsonplaceholder.typicode.com/todos/'+id)
        .subscribe(result => {
         console.log(`deleted ${id}`);
         this.todos.splice(index,1);
        }, error => {console.error(`failed to delete todo ${id}`)});

    }

    OnShowAdd()
    {
        console.log("showAdd", this.showAdd);
        
        if(!this.showAdd){this.showAdd = true; console.log("showAdd", this.showAdd); return;}

        this.showAdd = !this.showAdd;
    }

    OnAdd(event : any)
    {
        console.log(event);
        console.log(this.todoFormGroup.value);
        this.newToDo = this.todoFormGroup.value as ToDo;

        this._http.post('https://jsonplaceholder.typicode.com/todos/', this.newToDo)
        .subscribe(result => {
         console.log(`inserted ${this.newToDo}`);
         this.todos.push(result as ToDo);
         //(<FormGroup>this.todoFormGroup).setValue({userId : null, title : null, completed : false}, { onlySelf: true });
         this.todoFormGroup.reset();
         this.showAdd = false;
        }, error => {console.error(`failed to post todo ${this.newToDo}`)});

    }
}

interface ToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
