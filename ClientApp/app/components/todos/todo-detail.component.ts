import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { getBaseUrl } from '../../app.browser.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToDo, Company, User, Address, Geo } from './todos.component';

@Component({
    selector: 'todos',
    templateUrl: './todo-detail.component.html',
    styleUrls: ['./todo-detail.component.css']

})

/*
    To Do Add the Delete and Edit buttons. 
    one to delete then navigate to todos
    one to edit and navigate to edit. 

    disable all inputs.

*/
export class ToDoDetailComponent implements OnInit {
    public todo: ToDo;
    public users: User[];
    filteredUsers: Observable<User[]>;

    _http: HttpClient;
    showAdd: boolean = false;
    todoFormGroup: FormGroup;
    newToDo: ToDo;

    constructor(//http: Http, 
        private route: ActivatedRoute,
        private router: Router,
        http: HttpClient,
        private _formBuilder: FormBuilder) {
        this._http = http;
        this.users = [];
    }

    ngOnInit() {
        this.todoFormGroup = this._formBuilder.group({
            user: ['', Validators.required],
            title: ['', Validators.required],
            completed: [false]
        });
        this.todoFormGroup.disable();

        this.route.paramMap
        .switchMap((params: ParamMap) => {
            console.log('id :', params.get('id'))
            return this._http.get('https://jsonplaceholder.typicode.com/todos/' + params.get('id'))
        })
        .switchMap((result) => {
            this.todo = result as ToDo;
            console.log('got the to do:', this.todo);
            return this._http.get('https://jsonplaceholder.typicode.com/users');
            }
        )
        .subscribe(result => {
           this.users = result as User[];
            
           let user = this.users.filter(u => u.id == this.todo.userId)[0];
            console.log('got the user:', user);
            this.todoFormGroup.setValue({user : user, completed : this.todo.completed, title : this.todo.title});
        }, error => console.error(error));

        this.filteredUsers = this.todoFormGroup.controls.user.valueChanges
            .pipe(
            startWith(''),
            map(name => name ? this.filterUsers(name) : this.users.slice())
            );

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
  

    ViewToDos(toDo: ToDo) {
        this.router.navigate(['/todos/']);
      }

    filterUsers(name: string) {
        if (typeof name != 'string' || !this.users) { return this.users; }

        console.log('name', name);

        return this.users.filter(user =>
            user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
}
 