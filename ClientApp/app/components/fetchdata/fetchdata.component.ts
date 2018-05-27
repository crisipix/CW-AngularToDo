import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http'
import { getBaseUrl } from '../../app.browser.module';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})


export class FetchDataComponent implements OnInit {
    
       /*
        Switching from http to HttpClient
        https://stackoverflow.com/questions/45129790/difference-between-http-and-httpclient-in-angular-4v
        It's an upgraded version of http from @angular/http module with the following improvements:

        1. Interceptors allow middleware logic to be inserted into the pipeline
        2. Immutable request/response objects
        3. Progress events for both request upload and response download
            You can read about how it works in Insider’s guide into interceptors and HttpClient mechanics in Angular.
            https://blog.angularindepth.com/insiders-guide-into-interceptors-and-httpclient-mechanics-in-angular-103fbdb397bf?gi=8edb1e6aeec6
        4. Typed, synchronous response body access, including support for JSON body types
        5. JSON is an assumed default and no longer needs to be explicitly parsed
        6. Post-request verification & flush based testing framework

         // Remove this
         http.get(baseUrl + 'api/SampleData/WeatherForecasts')
         .subscribe(result => {
             this.forecasts = result.json() as WeatherForecast[];
         }, error => console.error(error));

        //in favor of
        this._http.get(getBaseUrl + 'api/SampleData/WeatherForecasts')
        .subscribe(result => {
            this.forecasts = result as WeatherForecast[];
        });

    */

    forecasts: WeatherForecast[];
    _http: HttpClient;
    constructor(//http: Http, 
                http: HttpClient,
                @Inject('BASE_URL') baseUrl: string) {

        this.forecasts = [];
        this._http = http;
    }

    ngOnInit()
    {
        this._http.get(getBaseUrl + 'api/SampleData/WeatherForecasts')
        .subscribe(result => {
            this.forecasts = result as WeatherForecast[];
        });
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
