const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const debug = require('debug')('app:startup');
const mongoose = require('mongoose');
const app = express();

const genre = require('./routes/genre');
const customer = require('./routes/customer');
const homePage = require('./routes/home');


mongoose.connect('mongodb://localhost:27017/vidly', {
    useNewUrlParser: true
  })
  .then(() => console.log('Database connection successful'))
  .catch(err => console.error('Database connection failed', err));

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
app.use('/api/customers', customer);
app.use('/', homePage);

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});