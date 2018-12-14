const express = require('express');
const router = express.Router();

const gig = require('../models/Gigs');

const Op = require('sequelize').Op;

// get gig list
router.get('/', (req, res) => {
  gig
    .findAll()
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
});

//display add gig form
router.get('/add', (req, res) => {
  res.render('add');
});

//add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  budget = `$${budget}`;
  technologies = technologies.toLowerCase().replace(/, /, ',');
  //insert into table
  gig
    .create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
    .then(gigs => res.redirect('/gigs'))
    .catch(err => console.log(err));
});

//search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  gig
    .findAll({
      where: { technologies: { [Op.like]: '%' + term.toLowerCase() + '%' } }
    })
    .then(gigs => {
      console.log(gigs);
      res.render('gigs', { gigs });
    })
    .catch(err => console.log(err));
});

module.exports = router;
