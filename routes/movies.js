const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  try {
    let movieList = await movieData.getAll()
    res.status(200).send(movieList)
  } catch (e) {
    next(e);
  }
});

// curl http://localhost:5000/movies/573a1390f29313caabcd4135
router.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ Msg: 'Please provide a valid id.' })
    }

    const theMovie = await movieData.getById(req.params.id)
    if (theMovie) {
      res.status(200).send(theMovie)
    } else {
      res.status(404).send({ Msg: `No movie found with id: ${req.params.id}` });
    }
  } catch (e) {
    next(e);
  }
});

// HOMEWORK TODO: add a get by title route handler
// curl http://localhost:5000/movies/titles/Titanic
// curl http://localhost:5000/movies/titles/Back%20To%20The%20Future
router.get("/titles/:title", async (req, res, next) => {
  try {
    // Check if the title is valid or not
    if (!req.params.title) {
      res.status(400).send({ error: 'Please provide a valid title.' });
    }
    // Get movies by the title
    const foundMovies = await movieData.getByTitle(req.params.title)
    if (foundMovies) {
      // Check if the result is not empty
      if (foundMovies.length > 0) {
        res.status(200).send(foundMovies)
      } else {
        res.status(404).send({ Msg: `No movie found with the title: ${req.params.title}` });
      }
    } else {
      res.status(400).send({ error: 'Oop! Bad request!' });
    }
  } catch (e) {
    next(e);
  }
});

// Extra credit - get movies by title and year
// curl http://localhost:5000/movies/Titanic/1997
router.get("/:title/:year", async (req, res, next) => {
  try {
    // Check if these params are valid or not
    if (!(req.params.title && req.params.year)) {
      res.status(400).send({ error: 'Please provide a pair of valid title and valid year.' });
    }
    // Get movies by the title and year
    const foundMovies = await movieData.getByTitleAndYear(req.params.title, req.params.year)
    if (foundMovies) {
      // Check if the result is not empty
      if (foundMovies.length > 0) {
        res.status(200).send(foundMovies)
      } else {
        res.status(404).send({ Msg: `No movie found with the title: ${req.params.title} and the year: ${req.params.year}` });
      }
    } else {
      res.status(400).send({ error: 'Oop! Bad request!' });
    }
  } catch (e) {
    next(e);
  }
});


// curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
  try {
    // Check if the movie's info is valid or not
    if (Object.keys(req.body).length > 0) {
      let result = await movieData.create(req.body);
      // Return the result
      res.status(200).send(result);
    } else {
      res.status(400).send({ Msg: 'Please provide a valid movie info.' });
    }
  } catch (e) {
    next(e);
  }
});

// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8
router.put("/:id", async (req, res, next) => {
  try {
    // Check if the id is valid or not
    if (!req.params.id) {
      res.status(400).send({ error: 'This is an invalid id.' })
    }
    // Check if the id is found or not
    const theMovie = await movieData.getById(req.params.id)
    if (theMovie) {
      // Check if the movie's info is not empty
      if (Object.keys(req.body).length > 0) {
        let updatedList = await movieData.updateById(req.params.id, req.body)
        res.status(200).send(updatedList)
      } else {
        res.status(400).send({ Message: 'Please provide a valid movie info.' })
      }
    } else {
      res.status(404).send({ error: `No movie found with id: ${req.params.id}` });
    }    
  } catch (e) {
    next(e);
  }
});

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete("/:id", async (req, res, next) => {
  try {
    // Check if id is valid or not
    if (!req.params.id) {
      res.status(400).send({ error: 'This is an invalid id.' })
    }
    // Check if id is found or not
    const theMovie = await movieData.getById(req.params.id)
    if (theMovie) {
      // Delete this movie by its id 
      const result = await movieData.deleteById(req.params.id)
      res.status(200).send(result)
    } else {
      res.status(404).send({ error: `No movie found with id: ${req.params.id}` });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
