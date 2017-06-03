"use strict";

const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    require('../models/bodies')
        .then(bodies => {
            bodies.find({})
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(err);
                })
        })
        .catch(err => {
            console.log("here");
            console.log(err);
            res.json(err);
        });
});

module.exports = router;