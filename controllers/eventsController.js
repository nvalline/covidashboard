const db = require("../models");

// Defining methods for the eventsController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function (req, res) {
    db.User.findById(req.params.id)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  findAllByUser: function (req, res) {
    db.User.findById(req.params.id)
      .then(dbModel => db.Event.find().where("_id").in(dbModel.events))
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    console.log("FINDBYID:", req.params.id)
    db.Event.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Event.create(req.body)
      .then(({ _id }) =>
        db.User.findOneAndUpdate(
          { _id: req.body.user },
          { $push: { events: _id } },
          { new: true }
        )
      )
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  },
  update: function (req, res) {
    db.Event.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Event.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
