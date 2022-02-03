import * as api from '../api/index.js';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export const getMovies = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMovies();
    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error);
  }
};

export const createMovie = (movie) => async (dispatch) => {
  try {
    const { data } = await api.createMovie(movie);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = (id, movie) => async (dispatch) => {
  try {
    const { data } = await api.updateMovie(id, movie);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await api.deleteMovie(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likeMovie = (id) => async (dispatch) => {
 // const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeMovie(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const rateMovie = (id) => async (dispatch) => {
  // const user = JSON.parse(localStorage.getItem('profile'));
 
   try {
     const { data } = await api.rateMovie(id);
     dispatch({ type: UPDATE, payload: data });
   } catch (error) {
     console.log(error);
   }
 };