const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  const theItem = itemData.getById(req.params.id)
  if(theItem){
    res.status(200).send(theItem)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  const newAttributes = req.body
  delete newAttributes.id
  let updatedItem = itemData.updateById(req.params.id, newAttributes)
  if(updatedItem){
    res.status(200).send(updatedItem)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});


router.delete("/:id", (req, res, next) => {
  const updatedList = itemData.deleteById(req.params.id)
  res.status(200).send({updatedList: updatedList})
});

module.exports = router;
