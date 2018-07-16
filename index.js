const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const debug = require('debug')('app:startup');
const app = express();

const genre = require('./routes/genre');
const homePage = require('./routes/home');

const port = process.env.PORT || 7500;

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
// app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.use(express.static('public'));
app.use(helmet());

// configuration


if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug(app.get('env'));
}

app.use('/api/genres', genre);
app.use('/', homePage);

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});