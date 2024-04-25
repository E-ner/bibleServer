/**
 * Books router
 */

const express = require("express");
const {
  addBook,
  deleteBook,
  listBooks,
  updateBook,
  bookById,
  bookBYIDLIST,
} = require("../controllers/bookController");
const router = express.Router();

// Book endpoints | Routes

router.route("/add_book").post(addBook);
router.route("/delete_book").delete(deleteBook);
router.route("/books/:book_id").get(bookBYIDLIST);
router.route("/book_list").get(listBooks);
router.param("book_id", bookById);
router.route("/update_book").put(updateBook);

module.exports = router;
