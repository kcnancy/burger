//required packages and resources
const express = require ('express');
const exphbs = require ('express-handlebars');
const routes = require('./controllers/burgers_controller.js');

//creates environment and/or static port
const PORT = process.env.PORT || 8080;

const app = express();

//connects to static files
app.use(express.static('public'));

//Handlebars template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//to use handling routes
app.use(routes);

//listening port
app.listen(PORT, ( )=>
    console.log(`server listening on http://localhost:${PORT}`)
    )



