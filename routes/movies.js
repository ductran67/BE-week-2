const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll()
  res.status(200).send(movieList)
});

// curl http://localhost:5000/movies/7
router.get("/:id", (req, res, next) => {
  const theMovie = movieData.getById(req.params.id)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"field":"new item value"}' http://localhost:5000/movies
router.post("/", (req, res, next) => {
  movieData.create(req.body);
  res.sendStatus(200);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"field":"updated value"}' http://localhost:5000/movies/7
router.put("/:id", async (req, res, next) => {
  let updatedList = await movieData.updateById(req.params.id, req.body)
  res.status(200).send(updatedList)
});

// curl -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
  const updatedList = movieData.deleteById(req.params.id)
  res.status(200).send(updatedList)
});

module.exports = router;
