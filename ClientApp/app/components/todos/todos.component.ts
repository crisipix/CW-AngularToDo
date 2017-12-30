import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http'
import { getBaseUrl } from '../../app.browser.module';

@Component({
    selector: 'todos',
    templateUrl: './todos.component.html'
})
export class ToDosComponent implements OnInit {
    public todos: ToDo[];
    _http: HttpClient;
    constructor(//http: Http, 
                http: HttpClient,
                @Inject('BASE_URL') baseUrl: string) {
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
    }

    OnDelete(id:number, index:number)
    {
        this._http.delete('https://jsonplaceholder.typicode.com/todos/'+id)
        .subscribe(result => {
         console.log(`deleted ${id}`);
         this.todos.splice(index,1);
        }, error => {console.error(`failed to delete todo ${id}`)});

    }
}

interface ToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
