const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://joseph:Js%403213@joseph-cluster.nkuuek9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collName = 'movies'

module.exports = {}

// Extra credit feature - get movies by title and year: getByTitleAndYear
module.exports.getByTitleAndYear = async (title, year) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  try {
    const query = { title: title, year: parseInt(year) };
    let foundMovies = await movies.find(query);
    
    return foundMovies.toArray();
  } catch (e) {
    return null;
  }
}

// HOMEWORK TODO: add a getByTitle function
module.exports.getByTitle = async (title) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  try {
    const query = { title: title };
    let foundMovies = await movies.find(query);
    
    return foundMovies.toArray();
  } catch (e) {
    return null;
  }
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  try {
    const query = {};
    let movieCursor = await movies.find(query).limit(10).project({title: 1}).sort({title: 1});
  
    return movieCursor.toArray();
  } catch (e) {
    return null;
  }
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/
module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  try {
    const query = {_id: ObjectId(movieId)};
    let movie = await movies.findOne(query);
  
    return movie
  } catch (e) {
    return null;
  }
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/delete/
module.exports.deleteById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  try {
    const deletionDoc = {_id:ObjectId(movieId)};
    const deleteResult = await movies.deleteOne(deletionDoc);
  
    return {message: `DELETED ${deleteResult.deletedCount} movies`}
  } catch (e) {
    return null;
  }
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/change-a-document/
module.exports.updateById = async (movieId, newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  try {
    const updateDoc = { $set: {"title" : newObj.title, "plot" : newObj.plot} }
    const filter = { _id: ObjectId(movieId) };
    const result = await movies.updateOne(filter, updateDoc);
  
    return {message: `UPDATED ${result.modifiedCount} movies`}
  } catch (e) {
    return null;
  }
}

// https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/
module.exports.create = async (newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  try {
    const result = await movies.insertOne(newObj);
    // return result;
    if (result.acknowledged) {
      return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
    } else {
      return {message: "ERROR"}
    }
  } catch (e) {
    return null;
  }
}