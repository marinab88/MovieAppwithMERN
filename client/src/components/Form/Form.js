import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper, Input } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createMovie, updateMovie } from '../../actions/movies';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId, half }) => {
  const [movieData, setMovieData] = useState ({ poster: '', title: '', overview: '', genre: '', year: '', limit: '' });
  const movie = useSelector((state) => (currentId ? state.movies.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (movie) setMovieData(movie);
  }, [movie]);

  const clear = () => {
    setCurrentId(null);
    setMovieData({ poster: '', title: '', overview: '', genre: '', year: '', limit: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createMovie({ ...movieData, name: user?.result?.name}));
    } else {
      dispatch(updateMovie(currentId, { ...movieData, name: user?.result?.name }));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own movies and like other's movies.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? `Editing "${movie.title}"` : 'Creating a Movie'}
        </Typography>
        
        <TextField name="title" variant="outlined" label="Title" fullWidth value={movieData.title} onChange={(e) => setMovieData({ ...movieData, title: e.target.value })} />
        <TextField name="overview" variant="outlined" label=
        "Overview" fullWidth multiline rows={4} value={movieData.overview} onChange={(e) => setMovieData({ ...movieData, overview: e.target.value })} />
        <TextField name="genre" variant="outlined" label="Genre" fullWidth value={movieData.genre} onChange={(e) => setMovieData({ ...movieData, genre: e.target.value})} />
        <div className="d-flex">
        <TextField name="year" variant="outlined" label="Year" half value={movieData.year} onChange={(e) => setMovieData({ ...movieData, year: e.target.value})} />
        <TextField name="limit" variant="outlined" label="Time" half value={movieData.limit} onChange={(e) => setMovieData({ ...movieData, limit: e.target.value})} />
        </div>

        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setMovieData({ ...movieData, poster: base64 })} />
        </div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      </form>
    </Paper>
  );
};

export default Form;