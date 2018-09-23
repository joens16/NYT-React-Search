const db = require("../models");

// Defining methods for the articleModelsController
module.exports = {
  findAll: function(req, res) {
    db.articleModel
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // findById: function(req, res) {
  //   db.articleModel
  //     .findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    db.articleModel
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.articleModel
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
                // update: function(req, res) {
                //   db.articleModel
                //     .findOneAndUpdate({ _id: req.params.id }, req.body)
                //     .then(dbModel => res.json(dbModel))
                //     .catch(err => res.status(422).json(err));
                // },
};
