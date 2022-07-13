const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://APIsuperuser:x@cluster0.bwarser.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collName = 'movies'

module.exports = {}

module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const query = {};
  let movieCursor = await movies.find(query).limit(10);

  return movieCursor.toArray();
}

module.exports.getById = (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  return {}
}

module.exports.deleteById = (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  return []
}

module.exports.updateById = (movieId, newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  return []
}

module.exports.create = (newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  return {}
}