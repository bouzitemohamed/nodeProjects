
const mongoose = require('mongoose');
async function connectToMongodb(MONGO_URI) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connexion amongo db etablie');
  } catch (e) {
    console.log('Error:', e);
  }
}

module.exports = connectToMongodb;
