// import 'core-js';
// require('zone.js/dist/zone');
// import 'core-js/es7/reflect';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';

//
// import 'bootstrap';
// import 'jquery';

// PrimeNG
import 'primeng/primeng';
import 'primeng/resources/themes/omega/theme.css';
import 'primeng/resources/primeng.min.css';

import 'hammerjs';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
