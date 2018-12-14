const express = require('express');
const exphdl = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./config/database');

// middlewares for handlebars
app.engine('handlebars', exphdl({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//bodyparser middleware
app.use(bodyparser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

db.authenticate()
  .then(() => console.log('db connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// other routes
app.use('/gigs', require('./routes/gig'));

app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

app.listen(PORT, () => console.log('server running at port: ' + PORT));
