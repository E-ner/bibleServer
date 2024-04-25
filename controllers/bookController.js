module.exports.addBook = async (req, res) => {
  const { Books } = req.db;
  const { key } = req;

  if (key == process.env.API_KEY) {
    await Books.create({
      bookTitle: req.body.title,
    });

    const list = await Books.findAll();
    res.status(201).json({ msg: "created", _data: list });
  } else {
    res.status(403).json({ msg: "Api token required" });
  }
};
module.exports.deleteBook = async (req, res) => {
  const { Books } = req.db;
  const { id } = req.query;
  const { key } = req;

  if (key == process.env.API_KEY) {
    const bookId = await Books.findOne({
      where: {
        id: id,
      },
    });
    if (bookId == null) {
      res.json({ msg: "book doesn't exist" });
    } else {
      const books = await Books.findAll();
      bookId.destroy();
      res.status(201).json({
        msg: "deleted",
        _data: books.filter((dataValues) => dataValues.id != id),
      });
    }
  } else {
    res.status(403).json({ msg: "Api token required" });
  }
};
module.exports.updateBook = async (req, res) => {
  const { Books } = req.db;
  const { key } = req;
  const { id } = req.query;
  const { title } = req.body;

  if (key == process.env.API_KEY) {
    if (!title) {
      res.send("title parameter required");
    } else {
      const bookId = await Books.findOne({
        where: {
          id: id,
        },
      });
      if (bookId == null) {
        res.json({ msg: "book doesn't exist" });
      } else {
        Books.update({ bookTitle: title }, { where: { id: id } });
        const books = await Books.findAll();
        res.status(200).json({
          msg: "updated",
          _data: books.filter((data) => {
            if (data.id == id) data.bookTitle = title;
            return data;
          }),
        });
      }
    }
  } else {
    res.status(403).json({ msg: "Api token required" });
  }
};
module.exports.listBooks = async (req, res) => {
  const { Books,Chapters,Verses } = req.db;
  const { key } = req;

  if (key == process.env.API_KEY) {
    const books = await Books.findAll({ include:[Chapters,Verses]});
    res.status(201).json({ msg: "found", _data: books });
  } else {
    res.status(403).json({ msg: "Api token required" });
  }
};
module.exports.bookById = async (req, res, next, id) => {
  const { Books,Chapters,Verses } = req.db;
  const { key } = req;

  if (key == process.env.API_KEY) {
    const bookId = await Books.findOne({
      where: {
        id: id,
      },
      include:[Chapters,Verses]
    });

    if (bookId == null) {
      req.books = null;
    } else {
      req.books = bookId;
    }
    next();
  } else {
    res.status(403).json({ msg: "Api token required" });
  }
};
module.exports.bookBYIDLIST = async (req, res) => {
  const { books } = req;
  const { key } = req;

  if (key == process.env.API_KEY) {
    if (books == null) {
      res.json({ msg: "no book found" });
    } else {
        res
          .status(200)
          .json({ msg: "found", _data: books });
    }
  } else {
    res.status(403).json({ msg: "Api token required" });
  }
};
