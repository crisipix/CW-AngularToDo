import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http'
import { getBaseUrl } from '../../app.browser.module';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent implements OnInit {
    public forecasts: WeatherForecast[];
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
