import { userModel } from "../Models/movModel.js";
import bcryp from "bcryptjs";
import { watchList } from "../Models/watchListModel.js";

//Signup
export const signUp = async (req, res) => {
  try {
    const { name, email, password, dateofBirth } = req.body;
    const existingUser = await userModel.find({ email });
    if (existingUser.length) {
      res.json({
        status: "Failed",
        message: "User with this email already exists",
      });
    } else {
      const saltRounds = 10;
      const hashedpassword = await bcryp.hash(password, saltRounds);
      const newUser = new userModel({
        name,
        email,
        password: hashedpassword,
        dateofBirth,
      });
      await newUser.save();
      res.json({
        status: "Success",
        message: "User created successfully",
        data: newUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "Failed",
      message: "An error occurred while processing your request",
    });
  }
};

//Sign In
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user && (await bcryp.compare(password, user.password))) {
      res.json({
        status: "Success",
        message: "Login successful",
        data: user,
      });
    } else {
      res.json({
        status: "Failed",
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "Failed",
      message: "An error occurred while processing your request",
    });
  }
};

//Other functionalities
export const addMovie = async (req, res) => {
  try {
    const { title, publishedYear, watched } = req.body;
    const movie = new watchList({
      title,
      watched,
      publishedYear,
    });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovie = async (req, res) => {
  try {
    const movies = await watchList.find({ user: req.user._id });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMovies = async (req, res) => {
  try {
    const movies = await watchList.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovieWatchedStatus = async (req, res) => {
  const { watched } = req.body;
  try {
    const movie = await watchList.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.watched = watched;
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await watchList.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
