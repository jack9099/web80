const filmMiddleWare = {
  checkMissing: (req, res, next) => {
    try {
      const { ID, name, time, year, image, introduce } = req.body;
      if (!ID) throw new Error("Film ID is required!");
      if (!name) throw new Error("Film name is required!");
      if (!time) throw new Error("Film length is required!");
      if (!year) throw new Error("Released year is required!");
      if (!image) throw new Error("Film avatar is required!");
      if (!introduce) throw new Error("Film summary is required!");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
      });
    }
  },
};

export default filmMiddleWare;
