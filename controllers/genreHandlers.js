const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);
const genreHandlers = {};

genreHandlers.getAll = async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
}

genreHandlers.getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) {
    return res.status(404).send({
      message: `No genre found with id: ${id}`
    });
  }
  res.status(200).send(genre);
}

genreHandlers.updateGenre = async (req, res) => {

  const error = validateGenre(req.body).error
  if (error) {
    return res.status(400).send({
      error: error.details[0].message
    });
  }

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  console.error(genre);

  if (!genre) {
    return res.status(404).send({
      message: `No genre with id: ${id}`
    });
  }

  res.status(200).send(genre);
}

genreHandlers.createGenre = async (req, res) => {
  const error = validateGenre(req.body).error;
  if (error) {
    return res.status(400).send({
      error: error.details[0].message
    });
  }

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);
}

genreHandlers.deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send({
      message: `No genre with id: ${id}`
    });
  }
  res.status(200).send(genre);
}

function validateGenre(genre) {
  return Joi.validate(genre, {
    name: Joi.string().min(3).required()
  });
}

module.exports = genreHandlers;