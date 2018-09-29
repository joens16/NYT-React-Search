const router = require("express").Router();
const articlesController = require("../controllers/articlesController");

//GET route: function to return all articles saved in the Articles collection
router.get("/articles", articlesController.findAll);

//Post Route - > function to add an article to the Articles Collection
router.post("/article", articlesController.create);

//Delete Article -> function to remove an article from the Article Collection
router.delete("/article/:id", articlesController.remove)

module.exports = router;
