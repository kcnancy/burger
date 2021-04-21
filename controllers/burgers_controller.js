const express = require("express");
const burger = require("../models/burgers.js");
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  burger.all(function (data) {
    const obj = {
      burgers: data,
    };
    console.log(obj);
    res.render("index", obj);
  });
});
//tp create new burger in db
router.post("/api/burgers", function (req, res) {
  let devoured = 0;
  if (req.body.devoured === "true") {
    devoured = 1;
  }
  console.log(res.body);
  burger.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, devoured],
    function (result) {
      console.log(result);
      //sends back id of new burger
      res.json({ id: result.insertId });
    }
  );
});

//for updating if burger is devoured

router.put("/api/burgers/:id", function (req, res) {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", function (req, res) {
  const condition = `id = ${req.params.id}`;

  burger.delete(condition, function (result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});
//export to server.js
module.exports = router;
