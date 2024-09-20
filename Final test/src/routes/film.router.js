import { Router } from "express";
import filmController from "../controllers/film.controller.js";
import filmMiddleWare from "../middlewares/film.middleware.js";

const FilmRouter = Router();

// CREATE new film
FilmRouter.post(
  "/new",
  filmMiddleWare.checkMissing,
  filmController.createNewFilm
);

// GET list films
FilmRouter.get("/list", filmController.getListsFilm);
export default FilmRouter;
