const Joi = require('joi');


const genres = [{
    id: 1,
    name: 'horror'
  },
  {
    id: 2,
    name: 'thriller'
  },
  {
    id: 3,
    name: 'comedy'
  }
];

const genreHandlers = {};

genreHandlers.getAll = (req, res) => {
  res.send(genres);
}

genreHandlers.getGenreById = (req, res) => {
  const id = +req.params.id;
  const genre = genres.filter(genre => genre.id === id);
  if (genre.length === 0) {
    res.status(404).send({
      message: `No genre found with id: ${id}`
    });
    return;
  }
  res.status(200).send(genre);
}

genreHandlers.updateGenre = (req, res) => {
  const id = +req.params.id;
  const genreExists = genres.find(genre => genre.id === id);

  const {
    error
  } = validateGenre(req.body);

  if (error) {
    res.status(400).send({
      error: error.details[0].message
    });
    return;
  }

  if (!genreExists) {
    res.status(404).send({
      message: `No genre with id: ${id}`
    });
    return;
  }

  genres.map(genre => {
    if (genre.id === id) {
      genre.name = req.body.name;
    }
  });
  const genre = genres.filter(genre => genre.id === id);

  res.status(200).send(genre);
}

genreHandlers.createGenre = (req, res) => {

  const {
    error
  } = validateGenre(req.body);

  if (error) {
    res.status(400).send({
      error: error.details[0].message
    });
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
}

genreHandlers.deleteGenre = (req, res) => {
  const id = +req.params.id;
  const genre = genres.find(genre => genre.id === id);
  if (!genre) {
    res.status(404).send({
      message: `No genre with id: ${id}`
    });
    return;
  }
  genres.splice(genres.indexOf(genre), 1);
  res.status(200).send(genre);
}

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(genre, schema);
}

module.exports = genreHandlers;