import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import movieRoutes from './routes/movies.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/movies', movieRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello to Movie API');
});

//const CONNECTION_URL = 'mongodb+srv://movieapp:movieapp123@cluster0.kufc7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));