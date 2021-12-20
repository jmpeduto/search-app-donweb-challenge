// import fetch from node-fetch;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const request = require("request");
const cors = require("cors");
// const http = require('httpclients')
const axios = require("axios");
const got = require('got');


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors());
// app.use(express.json());

//server config
app.get("/getListado", (req, resp) => {
 // 1. Crea un nuevo objeto XMLHttpRequest
	var response;
 got.post('http://c1300044.ferozo.com/getListado.php', { retry: { limit: 3, methods: ["GET", "POST"] }, json: true }).then(response_ => {
   console.log(response_.body.url);
//    console.log(response.body_.explanation);
   response = response_;
 }).catch(error => {
   console.log(error);
 });

 return resp.json(); 
});

app.get("/getListadoFetch", (req, resp) => {
	// var data = new FormData();

	// data.append('grant_type', 'password');
	// data.append('client_id', '2');
	// data.append('client_secret', 'secret_token');
	// data.append('scope', '*');

	// data.append('username', 'mail');
	// data.append('password', 'pwd');

	const config = {
	'mode': 'cors', 
		method: 'POST',
		headers: {
			'Accept': 'application/json',
		},
		body: {},
	}   

	var link = 'https://domain.com/oauth/token';
	fetch(link, config)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);

		})
		.catch(err => {
			console.log(err);
		})
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
