const express = require('express');

const router = express.Router();

const burgers = require('../models/burgers.js');

router.get('/', (req, res) => {
    burgers.all((data) => {
      const hbsObject = {
        burgers: data,
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });

router.post('/api/burgers', (req, res) => {
    burgers.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {

      res.json({ id: result.insertId });
    });
  });

  router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;

    console.log('condition', condition);

    burgers.update(
      {
        devoured: req.body.devoured,
      },
      condition,
      (result) => {
        if (result.changedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });

  module.exports = router;
