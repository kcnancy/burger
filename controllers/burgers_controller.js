const express = require("express");
const burgers = require("../models/burgers.js");
const burger = require("../models/burgers.js");
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  burger.all((data) => {
    const obj = {
      burgers: data,
    };
    console.log(obj);
    res.render("index", obj);
  });
});
//tp create new burger in db
router.post('/api/burgers/:id', (req, res) => {
  console.log(res.body);
  burgers.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured], (result) => {
      console.log(result);
      res.json({ id: result.insertId });
    }
  );
});

//for updating if burger is devoured

router.put('/api/burgers/:id', (req, res) => {
 const condition = `id = ${req.params.id}`;
 
 console.log('condition', condition);

  burgers.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete ('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;

  burgers.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  
    });
  });

module.exports = router;
