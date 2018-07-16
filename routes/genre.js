const express = require('express');

const router = express.Router();

const genreHandlers = require('../controllers/genreHandlers');

router.get('/', genreHandlers.getAll);

router.get('/:id', genreHandlers.getGenreById);

router.put('/:id', genreHandlers.updateGenre);

router.post('/', genreHandlers.createGenre);

router.delete('/:id', genreHandlers.deleteGenre);


module.exports = router;