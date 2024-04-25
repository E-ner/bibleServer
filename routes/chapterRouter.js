const express = require("express");
const { addChapter, deleteChapter, chapterBYIDLIST, chapterById, listChapters, updateChapter } = require("../controllers/chapterController");
const { bookById } = require("../controllers/bookController");
const router = express.Router();

// Chapter endpoints | Routes

router.route("/add_chapter").post(addChapter)
router.route("/delete_chapter").delete(deleteChapter)
router.route("/chapters/:book_id/:chapt_id").get(chapterBYIDLIST)
router.param("book_id",bookById)
router.param("chapt_id",chapterById);
router.route("/chapter_list").get(listChapters)
router.route("/update_chapter").put(updateChapter)

module.exports = router;