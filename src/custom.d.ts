declare global {
  namespace Express {
    interface Request {
      user: {
        id: mongoose.Schema.Types.ObjectId;
      };
    }
  }
}
