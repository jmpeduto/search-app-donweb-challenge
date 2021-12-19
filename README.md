# Ejecutar el proyecto
```npm install```

```ng serve```

# Solucion para Cors Angular (deprecada en actualizacion de Node)
 Crear un archivo de configuracion en la raiz del proyecto **proxy.conf.json**
 
 **pathRewrite** quita el /api de la llamada a la consulta del target
 
 ```javascript{
  "/api/*": {
    "target": "http://138.36.238.131:50074/api/getAllCategorias",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
      "pathRewrite": {
        "^/api": ""
      }
  }
}
```

Esto significa que cada llamada a http://localhost:4200/api va a apuntar a http://138.36.238.131:50074/api/getAllCategorias

Agregar estas lineas en angular.json para que al ejecutar **ng serve** se levante la configuracion del proxy

```javascript.....
"serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "search-app:build",
            "proxyConfig": "proxy.conf.json"
          },
    ......
}
```

