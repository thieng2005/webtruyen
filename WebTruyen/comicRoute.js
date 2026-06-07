const router = require("express").Router();
const {
  createComic,
  getAllComics
} = require("../controllers/comicController");

router.post("/", createComic);
router.get("/", getAllComics);

module.exports = router;