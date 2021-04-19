var orm = require("../config/orm.js");
//creates the object-relational mapping to the database
const burgers = {
  all(cb) {
    orm.all("burgers", (res) => cb(res));
  },
  create(cols, vals, cb) {
    orm.create("burgers", cols, vals, (res) => cb(res));
  },
  update(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, (res) => cb(res));
  },
  delete(condition, cb) {
    orm.delete("burgers", condition, (res) => cb(res));
  },
};

module.exports = burgers;
