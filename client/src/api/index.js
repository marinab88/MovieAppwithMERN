import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:3000' });
//https://movie-app-mern1.herokuapp.com/movies
//http://localhost:3000

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchMovies = () => API.get('/movies');
export const createMovie = (newMovie) => API.post('/movies', newMovie);
export const updateMovie = (id, updatedMovie) => API.patch(`/movies/${id}`, updatedMovie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
export const likeMovie = (id) => API.patch(`/movies/${id}/likeMovie`);
export const rateMovie = (id) => API.patch(`/movies/${id}/rateMovie`);

export const signIn = (form) => API.post('/user/signin', form);
export const signUp = (form) => API.post('/user/signup', form);