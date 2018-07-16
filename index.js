const express = require('express');
const morgan = require('morgan');
const app = express();

const genre = require('./routes/genre');

const port = process.env.PORT || 7500;


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(morgan('tiny'));

app.use('/api/genres', genre);

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});