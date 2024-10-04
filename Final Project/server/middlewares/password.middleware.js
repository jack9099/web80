import bcrypt from "bcrypt";

const hashPassword = async (userPassword) => {
  const saltRound = 10;
  return await bcrypt.hash(userPassword, saltRound);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export { hashPassword, comparePassword };
