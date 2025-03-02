import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
      process.env;
    console.log({ MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB });

    if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
      throw new Error(
        'Одна або декілька змінних оточення MongoDB не визначені',
      );
    }

    const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
