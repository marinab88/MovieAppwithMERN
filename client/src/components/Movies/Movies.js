import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Movie from './Movie/Movie';
import useStyles from './styles';

import { useLocation } from 'react-router-dom';
import { filterMovies } from './Movie/movieFilter';

const Movies = ({ setCurrentId, rating }) => {
  const movies = useSelector((state) => state.movies);
  const classes = useStyles();

  //for search
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const title = queryParams.get('title');

  const filteredMovies = title ? filterMovies(title, movies) : Object.values(movies);

  return (
    <>
      {!movies.length ?
        <CircularProgress /> : 
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {filteredMovies.map((movie) => (
              <Grid key={movie._id} item xs={12} sm={6} md={6}>
                <Movie movie={movie} setCurrentId={setCurrentId} rating={rating} />
              </Grid>
            ))}
          </Grid>
      }
    </>
  );
};

export default Movies;
