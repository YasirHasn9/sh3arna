export default {
  port: 8080,
  mongo: {
    uri: process.env.MONGO_URL,
  },
  saltRounds: Number(process.env.SALT_ROUNDS),
};
