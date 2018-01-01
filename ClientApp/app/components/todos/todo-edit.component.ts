import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { getBaseUrl } from '../../app.browser.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToDo, Company, User, Address, Geo } from './todos.component';


@Component({
    selector: 'todos',
    templateUrl: './todo-edit.component.html',
    styleUrls: ['./todo-edit.component.css']

})
/*
    To Do Add the Delete buttons. 
    one to delete then navigate to todos
    Save navigates to view.
*/
export class ToDoEditComponent implements OnInit {
    public todo: ToDo;
    public users: User[];
    filteredUsers: Observable<User[]>;

    _http: HttpClient;
    showAdd: boolean = false;
    todoFormGroup: FormGroup;
    newToDo: ToDo;

    constructor(
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

        // this._http.get('https://jsonplaceholder.typicode.com/users')
        // .subscribe(result => {
        //     this.users = result as User[];
        //     console.log(this.users);
        // },
        // error => { console.error(error) });

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
            userId: this.todoFormGroup.controls.user.value.id,
            id: 0,
            title: this.todoFormGroup.controls.title.value,
            completed: this.todoFormGroup.controls.completed.value,

        };

        this._http.put('https://jsonplaceholder.typicode.com/todos/' + this.todo.id, this.newToDo)
            .subscribe(result => {
                console.log(`inserted`, this.newToDo);
                this.todoFormGroup.reset();
                this.showAdd = false;
                this.ViewToDo(this.todo);
            }, error => { console.error(`failed to post todo ${this.newToDo}`) });

    }

    ViewToDo(toDo: ToDo) {
        console.log('navigate to', toDo);
        let toDoId = toDo ? toDo.id : null;
        // Pass along the todo id if available
        // so that the list component can select that hero.
        // Include a junk 'foo' property for fun.
        //this.router.navigate(['/todos/edit', { id: toDoId, foo: 'foo' }]);
        this.router.navigate(['/todos/'+toDoId]);
      }

    filterUsers(name: string) {
        if (typeof name != 'string' || !this.users) { return this.users; }

        console.log('name', name);

        return this.users.filter(user =>
            user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
}
