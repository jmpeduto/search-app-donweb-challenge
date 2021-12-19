// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
const request = require('request');



const app = express();

// const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
// var distDir = "/dist/";
// app.use(express.static(distDir));

app.get('/getListado', (req, resp) => {

    // let client_id = req.params.client_id;
    // let client_secret = req.params.client_secret;
    let serverUrl = 'http://c1300044.ferozo.com/getListado.php';
	var authOptions = {
        url: serverUrl,
        headers: {
            // Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
        },
        form: {
            // grant_type: 'client_credentials'
        },
        json: true
    };

    // var authOptions = {
    //     url: serverUrl,
    //     headers: {
    //         Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
    //     },
    //     form: {
    //         grant_type: 'client_credentials'
    //     },
    //     json: true
    // };
	// resp.json(body);


    request.post(authOptions, (err, httpResponse, body) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'No se pudo hacer la consulta',
                err
            })
        }

        resp.json(body);

    });

});


app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});