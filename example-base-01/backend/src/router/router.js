const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
    request('https://dummyjson.com/products', { json: true }, (err, response, body) => {
      if (err) {
        return next(err);
      }
      const transformedResponse = body.products?.map(p => ({ title: p.title, description: p.description })) || [];
      res.json(transformedResponse);
    });
  });

module.exports = router;