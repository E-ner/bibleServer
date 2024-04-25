const express = require("express");
const { addVerse, deleteVerse, verseById, verseBYIDLIST, listVerses, updateVerse } = require("../controllers/verseController");
const { bookById } = require("../controllers/bookController");
const { chapterById } = require("../controllers/chapterController");
const router = express.Router();

// Verse endpoints | Routes

router.route("/add_verse").post(addVerse);
router.route("/delete_verse").delete(deleteVerse);
router.route("/vers/:book_id/:chapt_id/:vers_id").head(verseBYIDLIST);
router.param("chapt_id",chapterById);
router.param("book_id",bookById);
router.param("vers_id",verseById);
router.route("/verse_list").get(listVerses);
router.route("/update_chapter").put(updateVerse);

module.exports = router;
