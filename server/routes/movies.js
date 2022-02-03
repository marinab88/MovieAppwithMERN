import express from 'express';

import { getMovies, createMovie, updateMovie, deleteMovie, likeMovie, rateMovie } from '../controllers/movies.js';

//

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', auth, createMovie);
router.patch('/:id', auth, updateMovie);
router.delete('/:id', auth, deleteMovie);

router.patch('/:id/likeMovie', auth, likeMovie);
router.patch('/:id/rateMovie', auth, rateMovie);
export default router;