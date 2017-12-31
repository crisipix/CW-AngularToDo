import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/*
    Switch from HttpModule and the Http service to HttpClientModule and the HttpClient service. 
    HttpClient simplifies the default ergonomics (You don’t need to map to JSON anymore) and now supports typed return values and interceptors. 
    https://angular.io/guide/http
*/
//import { HttpModule } from '@angular/http';  
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/primeng';     //accordion and accordion tab
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ToDosComponent } from './components/todos/todos.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ToDosComponent
    ],
    imports: [
        CommonModule,
        //HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AccordionModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatStepperModule,
        MatCardModule,
        MatAutocompleteModule,
        MatSelectModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'todos', component: ToDosComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
