import express from 'express';
import mongoose from 'mongoose';
import MovieMessage from '../models/movieMessage.js';
//import rateSchema from '../models/rateSchema.js';


const router = express.Router();

export const getMovies = async (req, res) => {
  try {
    const movieMessages = await MovieMessage.find();
    res.status(200).json(movieMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createMovie = async (req, res) => {
  const movie = req.body;

  const newMovie = new MovieMessage({ ...movie, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
} 

export const updateMovie = async (req, res) => {
  const { id: _id } = req.params;
  const movie = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No movie with id: ${_id}`);

  const updatedMovie = await MovieMessage.findByIdAndUpdate(_id, { ...movie, _id }, { new: true });

  res.json(updatedMovie);
}

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

  await MovieMessage.findByIdAndRemove(id);

  res.json({ message: 'Movie deleted successfully.'});
}

export const likeMovie = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

  const movie = await MovieMessage.findById(id);

  const index = movie.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the movie
    movie.likes.push(req.userId);
  } else {
    //dislike
    movie.likes = movie.likes.filter((id) => id !== String(req.userId));
  }
  const updatedMovie = await MovieMessage.findByIdAndUpdate(id, movie, { new: true });
  res.json(updatedMovie);
}

export const rateMovie = async (req, res) => {
  const { id } = req.params;
  const setRate = req.body;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No movie with id: ${id}`);

  const movie = await MovieMessage.findById(id);

  const index = movie.ratings.findIndex((id) => id === String(req.userId));

  //?????
  if (index === -1) {
    //
    movie.ratings.push(req.userId);
    movie.rating = movie.ratings.length;
  } else {
    //req.userId
    //movie.ratings.splice(index, 1);
    movie.ratings = movie.ratings.filter((id) => id !== String(req.userId));
   // movie.rating = movie.ratings.length;
  }

 
  const updatedRate = await MovieMessage.findByIdAndUpdate(id, movie, { new: true });
  res.json(updatedRate);
 
}

export default router;