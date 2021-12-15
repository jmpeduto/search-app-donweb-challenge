# Solucion para Cors Angular
 Crear un archivo de configuracion en la raiz del proyecto proxy.conf.json
 
 `{
  "/api/*": {
    "target": "http://138.36.238.131:50074/api/getAllCategorias",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
      "pathRewrite": {
        "^/api": ""
      }
  }
}`

Esto significa que cada llamada a http://localhost:4200/api va a apuntar a http://138.36.238.131:50074/api/getAllCategorias

Agregar estas lineas en angular.json para que al ejecutar ng serve se levante la configuracion del proxy

`.....
"serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "search-app:build",
            "proxyConfig": "proxy.conf.json"
          },
    ......
}`

# SearchApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
