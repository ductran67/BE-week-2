const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

// curl http://localhost:5000/items
router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

// curl http://localhost:5000/items/7
router.get("/:id", (req, res, next) => {
  const theItem = itemData.getById(req.params.id)
  if(theItem){
    res.status(200).send(theItem)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"field":"new item value"}' http://localhost:5000/items
router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"field":"updated value"}' http://localhost:5000/items/7
router.put("/:id", async (req, res, next) => {
  const newAttributes = req.body
  delete newAttributes.id
  let updatedList = await itemData.updateById(req.params.id, newAttributes)
  res.status(200).send(updatedList)
});

// curl -X DELETE http://localhost:5000/items/7
router.delete("/:id", (req, res, next) => {
  const updatedList = itemData.deleteById(req.params.id)
  res.status(200).send(updatedList)
});

module.exports = router;
