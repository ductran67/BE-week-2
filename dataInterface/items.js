const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  return module.exports.items.find(item => item.id == itemId)
}

module.exports.deleteById = async (itemId) => {
    const itemIndex = module.exports.items.findIndex(item => item.id == itemId)
    if (itemIndex != NaN){
      module.exports.items.splice(itemIndex, 1)
    }
    return module.exports.items
}

module.exports.updateById = async (itemId, newObj) => {
    const itemIndex = module.exports.items.findIndex(item => item.id == itemId)
    const originalItem = module.exports.items[itemIndex]
    if(originalItem){
      module.exports.items[itemIndex] = {...originalItem, ...newObj}
    }
    return module.exports.items
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}