const userMiddleWare = {
  checkMissing: (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("Email is required!");
      if (!password) throw new Error("Password is required!");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
      });
    }
  },
};

export default userMiddleWare;
