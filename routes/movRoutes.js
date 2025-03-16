import { Router } from "express";
import { signUp, signIn, getMovies, updateMovieWatchedStatus, deleteMovie, addMovie, getMovie } from "../Controllers/movControllers.js";
import { signUpValidation, signInValidation, validateUpdateMovie, validateAddMovie } from "../Validators/validation.js";

const movRouter = Router();

//User Routes
movRouter.post("/signup", signUpValidation, signUp);
movRouter.post("/signin", signInValidation, signIn);

// Add a movie
movRouter.post('/movies', validateAddMovie, addMovie);

// Get all movies
movRouter.get('/movies',  getMovies);

// Get movie by Id
movRouter.get('/movie',  getMovie);

// Update movie status
movRouter.put('/movies/:id', validateUpdateMovie, updateMovieWatchedStatus);

// Delete movie
movRouter.delete('/movies/:id',  deleteMovie);

export default movRouter;