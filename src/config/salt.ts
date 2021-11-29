export default {
  secret: process.env.SECRET || "your_salt",
  expiresIn: 60 * 60, //1 hour
};
