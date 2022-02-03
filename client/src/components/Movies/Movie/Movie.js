import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { likeMovie, deleteMovie, rateMovie } from '../../../actions/movies';
import StarRating from '../../StarRating/StarRating';
import { getSingleDecimalValue } from '../../StarRating/RatingAverage';
import useStyles from './styles';

const Movie = ({ movie, setCurrentId, rating }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

const Likes = () => {
    if (movie.likes.length > 0) {
      return movie.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{movie.likes.length > 2 ? `You and ${movie.likes.length - 1} others` : `${movie.likes.length} like${movie.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{movie.likes.length} {movie.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={movie.poster} title={movie.title} />
      <div className={classes.overlay}>
        <Typography variant="p">
          {movie.name}
        </Typography>
        <Typography variant="body2">
          {moment(movie.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === movie?.creator || user?.result?._id === movie?.creator) && (
        <div className={classes.overlay2}>
          <Button onClick={() => setCurrentId(movie._id)} style={{ color: 'white' }} size="small">
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">
        {movie.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {movie.overview}
        </Typography>
        <Typography variant="body2" component="p">
          {movie.genre}
        </Typography>

        

        <div className="d-flex justify-content-around text-success">
          {/*<Typography className="rating">
            {movie.rating}
            <FontAwesomeIcon icon={faStar} size="sm" />
      </Typography>*/}
          <Typography>
          &nbsp;{movie.limit}&nbsp;
          </Typography>
          <Typography>
            {movie.year}
          </Typography>

        </div>
        {/*<Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(rateMovie(movie._id))}>*/}
        <StarRating onClick={() => dispatch(rateMovie(movie._id))} />
        {/*</Button>*/}

      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeMovie(movie._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === movie?.creator || user?.result?._id === movie?.creator) 
          && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteMovie(movie._id))}>
            <DeleteIcon fontSize="small" />
              Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Movie;