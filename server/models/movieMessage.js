import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
  {
    poster: String,
    title: String,
    overview: String,
    name: String,
    creator: String,
    genre: String,
    year: String,
    limit: String,
   // vote_average: String,
    likes: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    ratings: { 
      type:  [String], 
      //{1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 9:1, 10:1 }
      default: [],
    },
  }
);

const MovieMessage = mongoose.model('MovieMessage', movieSchema);

export default MovieMessage;