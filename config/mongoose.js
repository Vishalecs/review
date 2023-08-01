const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoURI = 'mongodb+srv://vishalecs:Vishal123321@cluster0.ded7prj.mongodb.net/review1';
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000, // Set the timeout to 60 seconds
};

const connectWithRetry = () => {
  mongoose.connect(mongoURI, connectionOptions)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

module.exports = mongoose;
