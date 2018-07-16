const express = require('express');
const app = express();

const genre = require('./routes/genre');

const port = process.env.PORT || 7500;


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('/api/genre', genre);

app.listen(port, () => {
  console.log(`Server started on port ${port} ...`);
});