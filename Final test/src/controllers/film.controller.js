import FilmModel from "../models/film.model.js";

const filmController = {
  // GET list film
  getListsFilm: async (req, res) => {
    try {
      const listFilms = await FilmModel.getCollectionNames("films");
      res.status(200).send({
        message: "List of films",
        data: listFilms,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },

  // CREATE new film
  createNewFilm: async (req, res) => {
    try {
      const { ID, name, time, year, image, introduce } = req.body;
      const existedFilm = await FilmModel.findOne({ name });
      if (existedFilm) {
        return res.status(400).send({
          message: "Film already existed!",
          data: null,
        });
      }
      const createdNewFilm = await FilmModel.create({
        ID,
        name,
        time,
        year,
        image,
        introduce,
      });
      res.status(201).send({
        message: "Successfully created new film!",
        data: createdNewFilm,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default filmController;
