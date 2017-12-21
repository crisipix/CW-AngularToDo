https://alligator.io/angular/angular-5/
https://vitalflux.com/how-to-upgrade-angular-4-to-angular-5/

https://www.primefaces.org/primeng/#/setup
https://github.com/primefaces/primeng-quickstart-webpack


https://material.angular.io/guide/getting-started
https://github.com/angular/material2/blob/2.0.0-beta.7/README.md

dotnet new 
dotnet new angular project name is TodoAngular.

Tried to upgrade to Angular 5.0 seems like its there 
but haven't tried using the HTTPClient. 

* Tried adding Material 2 5.0 doesn't work. 
* Tried adding PrimeNg 5.0 it doesn't work when adding module as a dependency. not sure. 

* Issue with NGPrime : Microsoft.AspNetCore.NodeServices.HostingModels.NodeInvocationException: Prerendering failed because of error: ReferenceError: Event is not defined
https://stackoverflow.com/questions/43442770/prerendering-failed-because-of-error-referenceerror-event-is-not-defined-with

<app asp-prerender-module="ClientApp/dist/main-server">Loading...</app>
<app asp-ng2-prerender-module="ClientApp/dist/main-server">Loading...</app>

Commands for NPM
 *   "test": "karma start ClientApp/test/karma.conf.js",
 *   "clean": "rimraf wwwroot",
 *   "webpack": "webpack --config webpack.config.js",
 *   "webpack:vendor": "webpack --config webpack.config.vendor.js",
 *   "webpack:all": "npm run clean && npm run webpack:vendor && npm run webpack",
 *   "webpack:prod": "npm run clean && npm run webpack:vendor && webpack --config webpack.config.prod.js --env.prod",
 *   "start": "start http://localhost:5000 && dotnet run --environment=\"Development\"",
 *   "start:prod": "start http://localhost:5000 && dotnet run --environment=\"Production\""

 npm outdated <-- see what needs to be updated. 
 npm update   <-- update items that need it