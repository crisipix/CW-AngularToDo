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