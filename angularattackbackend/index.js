var koa = require('koa');
var app = koa();

var router = require('koa-router')();
var jwt = require('koa-jwt');
var routes = require('./routes')
// var secret = require('./secrets').jwt;
var secret = process.env.jwt;
var koaPg = require('koa-pg');
var koaPg = require('koa-pg')
// var postgresConn = require('./secrets').dbstring
var postgresConn = process.env.DATABASE_URL;


app.use(koaPg(postgresConn))
app.use(function *(next){
  this.set("Access-Control-Allow-Origin", "*");
  this.set("Access-Control-Allow-Credentials", "true");
  this.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT");
  this.set("Access-Control-Allow-Headers", "Authorization,Content-Type,Accept");
  if (this.method === 'OPTIONS') {
      this.status = 204;
  } else {
      yield next;
  } 

});

app.use(jwt({secret: secret, key: 'user'}).unless({path: [/^\/public/]}))

app
  .use(routes.routes())
  .use(routes.allowedMethods());

app.listen(process.env.PORT  || 3000);

console.log('the app is listening on port 3000')